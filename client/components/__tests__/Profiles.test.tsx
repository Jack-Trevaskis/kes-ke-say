// @vitest-environment jsdom
///this was initially copy-pasted from: https://github.com/manaia-roa-2024/code-from-class/blob/main/week3-async-apis-useQuery/2-testing-async-webAPI's/client/components/__tests__/Fire.test.tsx
import { describe, it, beforeAll, afterEach, vi, expect } from 'vitest'
import {  waitForElementToBeRemoved } from '@testing-library/react'
import { renderRoute } from '../../test-utils'
import nock from 'nock'

beforeAll(() => {
  nock.disableNetConnect()
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  vi.clearAllMocks()
})

const mockUser = {
  id: 1,
  auth0Id: 'auth0|123',
  username: 'paige',
  fullName: 'Paige Turner',
  location: 'Auckland',
  image: 'ava-03.png'
}


describe('<Profile />', () => {
  it('should render loading message', async () => {
    nock(document.baseURI)
      .get('/api/v1/users/paige')
      .reply(200,mockUser)

    const { ...screen } = renderRoute('/profiles/paige')
    const loadingMessage = await screen.getByText(/loading/i)

    expect(loadingMessage).toBeInTheDocument()
  })

  it('should render user profile information', async () => {
    const scope = nock(document.baseURI)
      .get('/api/v1/users/paige')
      .reply(200, mockUser)

    const { ...screen } = renderRoute('/profiles/paige')
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

    //  async wait for screen
    const username = await screen.findByText('paige')
    const fullname = await screen.findByText('Paige Turner')
    const location = await screen.findByText('Auckland')

    expect(username).toBeInTheDocument()
    expect(fullname).toBeInTheDocument()
    expect(location).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it("should render Edit button for currentUser's own page", async () => {
    //this test will need to be updated once AuthN is sorted
    const scope = nock(document.baseURI)
      .get(`/api/v1/users/${"ida"}`)
      .reply(200, mockUser)

    const { ...screen } = renderRoute('/profiles/ida')
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

    const editbutton = screen.findByText(/edit/i)

    expect(editbutton).toBeInTheDocument()
    // expect(() => screen.getByText(/edit/i))
    expect(scope.isDone()).toBe(true)
  })

  it("should NOT render the Edit button for other users' profiles", async () => {
    const scope = nock(document.baseURI)
      .get('/api/v1/users/paige')
      .reply(200,mockUser)
    const { ...screen } = renderRoute('/profiles/paige')

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
    
    expect(() => screen.getByText(/exit/i)).toThrow() //this doesn't work as we expect
    expect(scope.isDone()).toBe(true)
  })

  it('should render an error message when things go wrong with the server', async () => {
    const scope = nock(document.baseURI)
      .get('/api/v1/users/ida')
      .reply(500)

    const { ...screen } = renderRoute('/profiles/ida')
    const errorMessage = await screen.findByText(/Error/i)

    expect(errorMessage).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  it('should throw 404 error when user is not found', async () => {
    const scope = nock(document.baseURI)
      .get('/api/v1/users/not-a-real-user-00034')
      .reply(404)
    const { ...screen } = renderRoute('/profiles/not-a-real-user-00034')
    const errorMessage = await screen.findByText(/Error/i)
    expect(errorMessage).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })
})
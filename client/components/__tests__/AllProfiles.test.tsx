// @vitest-environment jsdom
///this was initially copy-pasted from: https://github.com/manaia-roa-2024/code-from-class/blob/main/week3-async-apis-useQuery/2-testing-async-webAPI's/client/components/__tests__/Fire.test.tsx
import { describe, it, beforeAll, afterEach, vi, expect } from 'vitest'
import { waitForElementToBeRemoved } from '@testing-library/react'
import { renderRoute } from '../../test-utils'
import nock from 'nock'

beforeAll(() => {
  nock.disableNetConnect()
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  vi.clearAllMocks()
})


describe('<AllProfiles />', () => {
  it('should render loading message', async () => {
    // ARRANGE
    // 'nock' an http network call
    nock(document.baseURI)
      // Fake the 'get' request and reply
      .get('/api/v1/users')
      .reply(200, [
        {
          id: 1,
          username: 'paige',
          location: 'Auckland',
          image: 'ava-03.png'
        },
        {
          id: 2,
          username: 'ida',
          location: 'Auckland',
          image: 'ava-02.png'
        },
        {
          id: 3,
          username: 'shaq',
          location: 'Christchurch',
          image: 'ava-16.png'
        },
      ])
    // .persist()
    // ACT
    //  render app
    const { ...screen } = renderRoute('/profiles')

    const loadingMessage = await screen.getByText(/loading/i) // 'loading'

    // ASSERT
    expect(loadingMessage).toBeInTheDocument()
  })

  it('should render profiles', async () => {
    // ARRANGE
    // 'nock' an http network call
    const scope = nock(document.baseURI)
    // nock(document.baseURI)
    // Fake the 'get' request and reply
    .get('/api/v1/users')
      .reply(200, [
        {
          id: 1,
          username: 'paige',
          location: 'Auckland',
          image: 'ava-03.png'
        },
        {
          id: 2,
          username: 'ida',
          location: 'Auckland',
          image: 'ava-02.png'
        },
        {
          id: 3,
          username: 'shaq',
          location: 'Christchurch',
          image: 'ava-16.png'
        },
      ])
    // .persist()
    // ACT
    //  render app
    const { ...screen } = renderRoute('/profiles')

    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

    //  async wait for screen
    const user1 = await screen.findByText('paige')
    // ASSERT
    expect(user1).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })

  // SAD PATH! ERRORS ERRORS ERRORS
  it('should render an error message when things go wrong', async () => {
    // ARRANGE
    // 'nock' an http network call
    const scope = nock(document.baseURI)
    // Fake the 'get' request and reply
    .get('/api/v1/users')
      // Fake the 'get' request and reply's with 500 server error
      .reply(500) // no data to respond with
    // ACT
    //  render app
    const { ...screen } = renderRoute('/profiles')

    // check that error message exists
    const errorMessage = await screen.findByText(/Error/i)

    // ASSERT
    expect(errorMessage).toBeInTheDocument()
    expect(scope.isDone()).toBe(true)
  })
})
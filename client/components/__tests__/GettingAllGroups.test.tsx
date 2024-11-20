// @vitest-environment jsdom
import { waitForElementToBeRemoved } from '@testing-library/react'
import { renderRoute } from '../../test-utils'
import { describe, it, beforeAll, afterEach, vi, expect } from 'vitest'
import nock from 'nock'

beforeAll(() => {
  nock.disableNetConnect()
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  vi.clearAllMocks()
})

describe('All Groups', () => {
  it('it should display loading message', async () => {
    // ARRANGE
    // Mock the API endpoint
    nock(document.baseURI).get('/api/v1/groups').reply(200)

    // ACT
    // Render the component
    const { ...screen } = renderRoute('/groups')

    const loadingMessage = screen.getByText(/loading/i) // 'loading'
    // 'loading'
    expect(loadingMessage).toBeInTheDocument()
  })

  it('it should display the groups', async () => {
    // ARRANGE
    // Mock the API endpoint
    const scope = nock(document.baseURI)
      .get('/api/v1/groups')
      .reply(200, [
        { id: 1, name: 'Group 1', image: 'exampleimage1.jpg' },
        { id: 2, name: 'Group 2', image: 'exampleimage2.png' },
      ])
    // ACT
    // Render the component
    const { ...screen } = renderRoute('/groups')
    screen.debug()
    // ASSERT
    // Check if the loading message is not displayed
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

    // Check if the groups are displayed
    const name1 = await screen.findByText('Group 1')
    expect(name1).toBeVisible()
    const name2 = await screen.findByText('Group 2')
    expect(name2).toBeVisible()

    // Check if the API call was made
    expect(scope.isDone()).toBe(true)
  })

  it('should render an error message', async () => {
    //ARRANGE
    // Mock the API endpoint with an error
    const scope = nock(document.baseURI)
      .get('/api/v1/groups')
      .reply(500, { message: 'Error getting groups' })

    // ACT
    // Render the component
    const { ...screen } = renderRoute('/groups')

    // ASSERT
    // Check if the error message is displayed
    const errorMessage = await screen.findByText(/error loading groups/i)
    expect(errorMessage).toBeVisible()

    // Check if the API call was made
    expect(scope.isDone()).toBe(true)
  })
})

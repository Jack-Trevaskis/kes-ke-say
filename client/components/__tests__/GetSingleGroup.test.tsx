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

describe('Single Groups', () => {
  it('it should display loading message', async () => {
    // ARRANGE
    // Mock the API endpoint
    nock(document.baseURI).get('/api/v1/groups/1').reply(200)

    // ACT
    // Render the component
    const { ...screen } = renderRoute('/groups/1')

    const loadingMessage = screen.getByText(/loading/i) // 'loading'
    // 'loading'
    expect(loadingMessage).toBeInTheDocument()
  })

  it('it should display the group', async () => {
    // ARRANGE
    // Mock the API endpoint
    const scope = nock(document.baseURI)
      .get('/api/v1/groups/1')
      .reply(200, 
        { id: 1, name: 'Group 1', image: 'exampleimage1.jpg' },
      )
    // ACT
    // Render the component
    const { ...screen } = renderRoute('/groups/1')
    screen.debug()
    // ASSERT
    // Check if the loading message is not displayed
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i))

    // Check if the groups are displayed
    const name = await screen.findByText('Group 1')
    expect(name).toBeVisible()

    // Check if the API call was made
    expect(scope.isDone()).toBe(true)
  })

  it('should render an error message when things go wrong', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/groups/1')
      .reply(500);

    const { ...screen } = renderRoute('/groups/1');

    const errorMessage = await screen.findByText(/Error/i);
    expect(errorMessage).toBeInTheDocument();
  });
})
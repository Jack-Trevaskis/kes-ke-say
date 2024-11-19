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
    const scope = nock(document.baseURI)
      .get('/api/v1/groups')
      .reply(200, [
        { id: 1, name: 'Group 1', image: 'exampleimage1.jpg' },
        { id: 2, name: 'Group 2', image: 'exampleimage2.png' },
      ])

    // ACT
    // Render the component
    const { ...screen } = renderRoute('/groups')

    const loadingMessage = await screen.getByText(/loading/i) // 'loading'
    expect(loadingMessage).toBeInTheDocument()

    // const name = await screen.findByText('Group 1')
    // expect(name).toBeVisible()
    // expect(scope.isDone()).toBe(true)
  })
})

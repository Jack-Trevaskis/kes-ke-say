// @vitest-environment jsdom
// import { setupApp } from './setup'
import { screen } from '@testing-library/react'

import { renderRoute } from '../../test-utils'

import { describe, it, expect, beforeAll } from 'vitest'
import nock from 'nock'


beforeAll(() => {
  nock.disableNetConnect()
})

describe('Get Single Group', () => {
  it('displays group', async () => {
      renderRoute('/groups')
        // Mock the API endpoint
        const scope = nock('http://localhost:5173')
            .get('/api/v1/groups/1')
            .reply(200, {
                groups: [
                    { id: 1, name: 'Group 1', image: 'exampleimage1.jpg' },
                ],
            });

        // const screen = renderRoute('/groups')

        const name = await screen.findByText('Group 1')
        expect(name).toBeVisible()
        expect(scope.isDone()).toBe(true)
    });
});
// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'

import { renderRoute } from '../../test-utils'

//TODO!
//copy-pasta from another test
describe('<AllProfiles />', () => {
  it('I don;t know yet', () => {
    // renderRoute('/login')

    const button = screen.getByRole('button', { name: /Sign Up/ })
    expect(button).toContainHTML('button')
    expect(button).toHaveClass('px-8')
    expect.assertions(2)
  })
})

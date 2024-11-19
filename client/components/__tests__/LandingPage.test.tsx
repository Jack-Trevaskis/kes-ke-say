// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'

import { renderRoute } from '../../test-utils'

describe('<LandingPage />', () => {
  it('renders a button that has a <button> html tag and a class name', () => {
    renderRoute('/login')

    const button = screen.getByRole('button', { name: /Sign Up/ })
    expect(button).toContainHTML('button')
    expect(button).toHaveClass('px-8')
    expect.assertions(2)
  })
})

describe('<Home />', () => {
  it('renders a main tag', () => {
    renderRoute('/')

    const main = screen.getByRole('main')
    expect(main).toContainHTML('main')
    expect.assertions(1)
  })

  it('renders a post feed section', async () => {
    renderRoute('/')

    // const loading = screen.getByText('Loading...')
    await waitForElementToBeRemoved(async () => {
      const section = screen.getByTestId('post-feed')
      expect(section).toContainHTML('section')
    })

    expect.assertions(1)
  })
})

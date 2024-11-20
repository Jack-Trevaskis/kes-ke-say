// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderRoute } from '../../test-utils'

describe('<Home />', () => {
  it('renders a main tag', () => {
    renderRoute('/')

    const main = screen.getByRole('main')
    expect(main).toContainHTML('main')
    expect.assertions(1)
  })
})

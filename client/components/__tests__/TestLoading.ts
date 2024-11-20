import { expect } from 'vitest'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'

export default async function TestLoading() {
  const loadingSpinner = screen.getByLabelText('loading-spinner')
  const loadingSvg = loadingSpinner.querySelector('svg')
  const loadingMessage = loadingSpinner.querySelector('span')

  expect(loadingSpinner).toBeInTheDocument()
  expect(loadingSpinner).toContainElement(loadingSvg)
  expect(loadingSpinner).toContainElement(loadingMessage)

  await waitForElementToBeRemoved(loadingSpinner)
}

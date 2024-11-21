// @vitest-environment jsdom
import { describe, it, beforeAll, afterEach, vi, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderRoute } from '../../test-utils'
import nock from 'nock'
import TestLoading from './TestLoading'

beforeAll(() => {
  nock.disableNetConnect()
  vi.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  vi.clearAllMocks()
})

const mockResponse = {
  userAccountName: 'ida',
  userFullName: 'Ida Dapizza',
  userImage: 'ava-02.png',
  userId: 'auth0|234',
  postId: 3,
  postBody: 'No pineapples',
  postImage:
    'https://img.freepik.com/free-photo/pineapple-with-knife-white-cutting-board_176474-8791.jpg',
  postCreatedAt: 1731965402428,
}

describe('<Post />', () => {
  it('should render loading spinner', async () => {
    nock(document.baseURI).get('/api/v1/posts/3').reply(200, mockResponse)
    renderRoute('/post/3')
    await TestLoading()
  })

  it('should render a post page', async () => {
    nock(document.baseURI).get('/api/v1/posts/3').reply(200, mockResponse)
    renderRoute('/post/3')
    await TestLoading()

    const pageContainer = screen.getByRole('main')
    const profileLink = screen.getByLabelText('Profile Link')

    expect(pageContainer).toBeInTheDocument()
    expect(profileLink).toBe(pageContainer.children[0])
    expect(profileLink).toContainHTML('img')
    expect(profileLink).toContainHTML('span')
  })

  it("should display first post's data in an appropriate way", async () => {
    nock(document.baseURI).get('/api/v1/posts/3').reply(200, mockResponse)
    renderRoute('/post/3')
    await TestLoading()

    const pageContainer = screen.getByRole('main')
    const profileLink = screen.getByLabelText('Profile Link')

    expect(profileLink).toHaveTextContent('Ida Dapizza (ida)')
    expect(pageContainer).toHaveTextContent('No pineapples')
  })
})

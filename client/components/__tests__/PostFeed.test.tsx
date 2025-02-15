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

const mockResponse = [
  {
    userAccountName: 'paige',
    userFullName: 'Paige Turner',
    userImage: 'ava-03.png',
    userId: 'auth0|123',
    postId: 1,
    postBody: 'I found this really interesting book, you should check it out',
    postImage:
      'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
    postCreatedAt: 1731965402428,
  },
  {
    userAccountName: 'ida',
    userFullName: 'Ida Dapizza',
    userImage: 'ava-02.png',
    userId: 'auth0|234',
    postId: 2,
    postBody: 'I found this really cool Italian place, they have the best food',
    postImage:
      'https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg',
    postCreatedAt: 1731965402428,
  },
  {
    userAccountName: 'ida',
    userFullName: 'Ida Dapizza',
    userImage: 'ava-02.png',
    userId: 'auth0|234',
    postId: 3,
    postBody: 'No pineapples',
    postImage:
      'https://img.freepik.com/free-photo/pineapple-with-knife-white-cutting-board_176474-8791.jpg',
    postCreatedAt: 1731965402428,
  },
]

describe('<PostFeed />', () => {
  it('should render loading spinner', async () => {
    nock(document.baseURI).get('/api/v1/posts').reply(200, mockResponse)
    renderRoute('/')
    await TestLoading()
  })

  it('should render post-feed section', async () => {
    nock(document.baseURI).get('/api/v1/posts').reply(200, mockResponse)
    renderRoute('/')
    await TestLoading()

    const section = screen.getByLabelText('Post Feed')

    expect(section).toBeInTheDocument()
  })

  it('should show 2 posts', async () => {
    nock(document.baseURI).get('/api/v1/posts').reply(200, mockResponse)
    renderRoute('/')
    await TestLoading()

    const section = screen.getByLabelText('Post Feed')

    expect(section.children).toHaveLength(3)
  })

  it("should display third post's data in an appropriate way", async () => {
    nock(document.baseURI).get('/api/v1/posts').reply(200, mockResponse)
    renderRoute('/')
    await TestLoading()

    const post = screen.getByLabelText('Post Feed').children[2]
    const profileLink = post.querySelector('[aria-label="Profile Link"]')
    const avatar = profileLink?.querySelector('img')
    const username = profileLink?.querySelector('p')
    const postBody = profileLink?.parentElement?.children[1]

    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', '/images/avatars/ava-02.png')
    expect(username).toBeInTheDocument()
    expect(username).toHaveTextContent('Ida Dapizza (ida)')
    expect(postBody).toBeInTheDocument()
    expect(postBody).toHaveTextContent('No pineapples')
  })
})

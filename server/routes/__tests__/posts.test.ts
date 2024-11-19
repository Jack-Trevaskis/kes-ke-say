import { describe, it, expect, afterAll, vi } from 'vitest'
import request from 'supertest'
import server from '../../server'
import * as func from '../../db/functions/posts'
vi.mock('../../db/functions/posts')

const mockPosts = [
  {
    userName: 'paige',
    userImage: 'ava-03.png',
    userId: 'auth0|123',
    postId: 1,
    postBody: 'I found this really interesting book, you should check it out',
    postImage:
      'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
    postCreatedAt: 1731980232585,
  },
  {
    userName: 'ida',
    userImage: 'ava-02.png',
    userId: 'auth0|234',
    postId: 2,
    postBody: 'I found this really cool Italian place, they have the best food',
    postImage:
      'https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg',
    postCreatedAt: 1731980232585,
  },
]

afterAll(() => {
  vi.restoreAllMocks()
})

describe('Getting posts', () => {
  it('gets posts', async () => {
    vi.mocked(func.getAllPosts).mockResolvedValue(mockPosts)

    const res = await request(server).get('/api/v1/posts/')
    // console.log(res.body)
    expect(res.body).toMatchInlineSnapshot(`
      [
        {
          "postBody": "I found this really interesting book, you should check it out",
          "postCreatedAt": 1731980232585,
          "postId": 1,
          "postImage": "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
          "userId": "auth0|123",
          "userImage": "ava-03.png",
          "userName": "paige",
        },
        {
          "postBody": "I found this really cool Italian place, they have the best food",
          "postCreatedAt": 1731980232585,
          "postId": 2,
          "postImage": "https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg",
          "userId": "auth0|234",
          "userImage": "ava-02.png",
          "userName": "ida",
        },
      ]
    `)
  })

  it('throws a database error', async () => {
    vi.mocked(func.getAllPosts).mockRejectedValue(mockPosts)
    const res = await request(server).get('/api/v1/posts/')
    // console.log(res.body)
    expect(res.statusCode).toBe(500)
  })
})

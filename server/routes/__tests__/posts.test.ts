import {
  describe,
  it,
  expect,
  afterAll,
  vi,
  beforeAll,
  beforeEach,
} from 'vitest'
import request from 'supertest'
import server from '../../server'
import * as func from '../../db/functions/posts'
import connection from '../../db/connection'

vi.mock('../../db/functions/posts')

const mockPosts = [
  {
    userAccountName: 'paige',
    userFullName: 'Paige Turner',
    userImage: 'ava-03.png',
    userId: 'auth0|123',
    postId: 1,
    postBody: 'I found this really interesting book, you should check it out',
    postImage:
      'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
    postCreatedAt: 1731980232585,
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
    postCreatedAt: 1731980232585,
  },
]

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  vi.restoreAllMocks()
  await connection.destroy()
})

describe('Getting all posts', () => {
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
          "userAccountName": "paige",
          "userFullName": "Paige Turner",
          "userId": "auth0|123",
          "userImage": "ava-03.png",
        },
        {
          "postBody": "I found this really cool Italian place, they have the best food",
          "postCreatedAt": 1731980232585,
          "postId": 2,
          "postImage": "https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg",
          "userAccountName": "ida",
          "userFullName": "Ida Dapizza",
          "userId": "auth0|234",
          "userImage": "ava-02.png",
        },
      ]
    `)
  })

  it('throws a database error when something went wrong', async () => {
    vi.mocked(func.getAllPosts).mockRejectedValue(mockPosts)
    const res = await request(server).get('/api/v1/posts/')
    // console.log(res.body)
    expect(res.statusCode).toBe(500)
  })
})

describe('Getting single post', () => {
  it('returns a 404 when there is no post by that id', async () => {
    // vi.mocked(func.getPostById).mockResolvedValue()
    const res = await request(server).get('/api/v1/posts/5')

    expect(res.statusCode).toBe(404)
  })

  it('gets post by id', async () => {
    vi.mocked(func.getPostById).mockResolvedValue(mockPosts[1])

    const res = await request(server).get('/api/v1/posts/2')
    // console.log(res.body)
    expect(res.body).toMatchInlineSnapshot(`
      {
        "postBody": "I found this really cool Italian place, they have the best food",
        "postCreatedAt": 1731980232585,
        "postId": 2,
        "postImage": "https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg",
        "userAccountName": "ida",
        "userFullName": "Ida Dapizza",
        "userId": "auth0|234",
        "userImage": "ava-02.png",
      }
    `)
  })

  it('throws a database error when something went wrong', async () => {
    vi.mocked(func.getPostById).mockRejectedValue(mockPosts[1])
    const res = await request(server).get('/api/v1/posts/1')
    // console.log(res.body)
    expect(res.statusCode).toBe(500)
  })
})

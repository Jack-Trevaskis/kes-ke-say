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
// import * as func from '../../db/functions/posts'
import connection from '../../db/connection'

// vi.mock('../../db/functions/posts')

// const mockPosts = [
//   {
//     userAccountName: 'paige',
//     userFullName: 'Paige Turner',
//     userImage: 'ava-03.png',
//     userId: 'auth0|123',
//     postId: 1,
//     postBody: 'I found this really interesting book, you should check it out',
//     postImage:
//       'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg',
//     postCreatedAt: 1731980232585,
//   },
//   {
//     userAccountName: 'ida',
//     userFullName: 'Ida Dapizza',
//     userImage: 'ava-02.png',
//     userId: 'auth0|234',
//     postId: 2,
//     postBody: 'I found this really cool Italian place, they have the best food',
//     postImage:
//       'https://img.freepik.com/free-photo/fettuccine-with-tomato-sauce-minced-meat-garnished-with-grated-parmesan_141793-1778.jpg',
//     postCreatedAt: 1731980232585,
//   },
// ]

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

describe('Deleting posts', () => {
  it('deletes a post', async () => {
    // TODO: write server integration test for event delete
    const res = await request(server).get('/api/v1/posts/1')
    expect(res.status).toBe(200) // success

    const res2 = await request(server).delete('/api/v1/posts/1')
    expect(res2.status).toBe(204) //no content

    const res3 = await request(server).get('/api/v1/posts/1')
    expect(res3.status).toBe(404)
  })

  it('404s if there is no post', async () => {
    // TODO: write server integration test for event delete
    const res = await request(server).delete('/api/v1/posts/11')
    expect(res.status).toBe(404)
  })
})

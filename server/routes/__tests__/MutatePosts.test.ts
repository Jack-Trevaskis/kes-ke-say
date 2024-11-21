import {
  describe,
  it,
  expect,
  afterAll,
  beforeAll,
  beforeEach,
} from 'vitest'
import request from 'supertest'
import server from '../../server'
import connection from '../../db/connection'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

afterAll(async () => {
  await connection.destroy()
})

describe('Deleting posts', () => {
  it('deletes a post', async () => {
    const res = await request(server).get('/api/v1/posts/1')
    expect(res.status).toBe(200) // success

    const res2 = await request(server).delete('/api/v1/posts/1')
    expect(res2.status).toBe(204) //no content

    const res3 = await request(server).get('/api/v1/posts/1')
    expect(res3.status).toBe(404) //not found
  })

  it('404s if there is no post', async () => {
    const res = await request(server).delete('/api/v1/posts/11')
    expect(res.status).toBe(404)
  })
})

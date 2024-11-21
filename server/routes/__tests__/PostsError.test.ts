import { describe, it, expect, afterAll, vi } from 'vitest'
import request from 'supertest'
import server from '../../server'
import * as func from '../../db/functions/posts'

vi.mock('../../db/functions/posts')

afterAll(async () => {
  vi.restoreAllMocks()
})

describe('getting all posts', () => {
  it('fails with a server error', async () => {
    vi.mocked(func.getAllPosts).mockImplementation(async () => {
      throw new Error('Database error')
    })

    const res = await request(server).get('/api/v1/posts')
    expect(res.status).toBe(500)
    expect(func.getAllPosts).toHaveBeenCalled()
  })
})

describe('getting single post', () => {
  it('fails with a server error', async () => {
    vi.mocked(func.getPostById).mockImplementation(async () => {
      throw new Error('Database error')
    })

    const res = await request(server).get('/api/v1/posts/1')
    expect(res.status).toBe(500)
    expect(func.getPostById).toHaveBeenCalled()
  })
})

describe('delete a post', () => {
  it('fails with a server error', async () => {
    vi.mocked(func.deletePost).mockImplementation(async () => {
      throw new Error('Database error')
    })

    const res = await request(server).delete('/api/v1/posts/1')
    expect(res.status).toBe(500)
    expect(func.deletePost).toHaveBeenCalled()
  })
})

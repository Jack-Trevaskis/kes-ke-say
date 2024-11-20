import { beforeAll, beforeEach, expect, describe, it, afterAll } from 'vitest'
import * as func from '../functions/posts'
import db from '../connection'
import { PostResponse } from '../../../models/post'

beforeAll(async () => {
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})

afterAll(async () => {
  await db.destroy()
})

describe('getAllPosts', () => {
  it('should return a PostResponse array of 4 objects', async () => {
    const posts: PostResponse[] = await func.getAllPosts()

    expect(posts).toHaveLength(4)
    expect(posts[1].userId).toBe('auth0|234')
  })
})

describe('getPostById', () => {
  it('should return a single PostResponse', async () => {
    const post: PostResponse = await func.getPostById('1')

    expect(post.userId).toBe('auth0|123')
  })
})

describe('deletePost', () => {
  it('deletes a post given an id', async () => {
    const step2 = await func.deletePost('2')
    expect(step2).toBe(1)
  })
})

import { beforeAll, beforeEach, expect, describe, it } from 'vitest'
import * as func from '../functions/posts'
import db from '../connection'
import { PostResponse } from '../../../models/post'

beforeAll(async () => {
  // console.log('before all')
  await db.migrate.latest()
})
beforeEach(async () => {
  // console.log('before each ')
  await db.seed.run()
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

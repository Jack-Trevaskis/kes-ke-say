import { beforeAll, beforeEach, expect, describe, it } from 'vitest'
import * as func from '../functions/posts'
import db from '../connection'
import { PostResponse } from '../../../models/post'

beforeAll(async () => {
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})

describe('Read functions', () => {
  it('should return a PostResponse array of 4 objects', async () => {
    const posts: PostResponse[] = await func.getAllPosts()

    expect(posts).toHaveLength(4)
    expect(posts[1].userId).toBe('auth0|234')
  })
})

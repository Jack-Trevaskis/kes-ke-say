import request from 'superagent'
import { Post, PostResponse } from '../../models/post'

export async function getAllPosts(): Promise<PostResponse[]> {
  const result = await request.get('/api/v1/posts/')
  return result.body as PostResponse[]
}

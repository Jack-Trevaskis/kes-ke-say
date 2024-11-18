import request from 'superagent'
import { Post } from '../../models/post'

export async function getAllPosts(): Promise<Post[]> {
  const result = await request.get('/api/v1/posts/')
  return result.body as Post[]
}

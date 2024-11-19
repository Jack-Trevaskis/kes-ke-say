import request from 'superagent'
import { Post, PostResponse } from '../../models/post'

const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export async function getAllPosts(): Promise<PostResponse[]> {
  const result = await request.get(`${rootURL}/posts`)
  return result.body as PostResponse[]
}

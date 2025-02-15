import request from 'superagent'
import { PostResponse } from '../../models/post'

const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export async function getAllPosts(): Promise<PostResponse[]> {
  const result = await request.get(`${rootURL}/posts`)
  return result.body as PostResponse[]
}

export async function getPostById(id: string): Promise<PostResponse> {
  const result = await request.get(`${rootURL}/posts/${id}`)
  return result.body as PostResponse
}

export async function deletePostById(id: string) {
  const result = await request.delete(`${rootURL}/posts/${id}`)
  return result.statusCode
}

import request from 'superagent'
import type { User } from '../../models/user'


const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export async function getAllUsers() {
  const response = await request.get(`${rootURL}/users`)
  
  return response.body as User[]
}
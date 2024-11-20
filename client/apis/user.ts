import request from 'superagent'
import type { User } from '../../models/user'


const rootURL = new URL(`/api/v1`, document.baseURI).toString()

export async function getAllUsers(): Promise<User[]>  {
  const response = await request.get(`${rootURL}/users`)
  
  return response.body as User[]
}

export async function getUser (username: string | undefined): Promise<User> {
const response = await request.get(`${rootURL}/users/${username}`)
  return response.body as User
}
import request from 'superagent'
import type { User } from '../../models/user'

export async function getAllUsers() {
  const response = await request.get('api/v1/users')
  
  return response.body as User[]
}
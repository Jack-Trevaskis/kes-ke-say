import connection from '../connection.ts'
import { User } from '../../../models/user'

export async function getAllUsers(): Promise<User[]> {
  return await connection('users')
  .select('id',
    'username', 
    'location', 
    'image',
  )
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
  const user = await connection('users')
  .where({username})
  .select('id',
    'auth0_id as auth0Id', 
    'username', 
    'full_name as fullName', 
    'location', 
    'image',
  )
  .first()
  return user
}
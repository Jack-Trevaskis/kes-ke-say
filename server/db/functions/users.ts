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

//oops this is for next ticket

// export async function getUsersById(id: number | string): Promise<User> {
//   const user = await connection('users')
//   .where({id})
//   .select('id',
    // 'auth0_id as auth0Id', 
    // 'username', 
    // 'full_name as fullName', 
//     'location', 
//     'image',
//   )
//   .first()
//   return user
// }
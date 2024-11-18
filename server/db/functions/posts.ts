import db from '../connection'

export async function getAllPosts() {
  const result = await db('posts').select('*')
  // console.log(result)
  return result
}

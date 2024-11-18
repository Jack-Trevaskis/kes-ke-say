import db from '../connection'

export async function getAllPosts() {
  const result = await db('posts')
    .join('users', 'posts.user_id', 'users.id')
    .select(
      'username as userName',
      'users.image as userImage',
      'auth0_id as userId',
      'posts.id as postId',
      'body as postBody',
      'posts.image as postImage',
      'created_at as postCreatedAt',
    )
  // console.log(result)
  return result
}

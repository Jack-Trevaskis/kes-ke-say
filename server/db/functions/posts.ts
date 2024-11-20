import db from '../connection'

export async function getAllPosts() {
  const result = await db('posts')
    .join('users', 'posts.user_id', 'users.id')
    .select(
      'users.username as userAccountName',
      'users.full_name as userFullName',
      'users.image as userImage',
      'users.auth0_id as userId',
      'posts.id as postId',
      'posts.body as postBody',
      'posts.image as postImage',
      'posts.created_at as postCreatedAt',
    )
  return result
}

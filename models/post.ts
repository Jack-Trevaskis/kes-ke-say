export interface PostData {
  userId: number
  body: string
  image?: string
  createdAt: number
}

export interface Post extends PostData {
  id: number
}

export interface PostResponse {
  userName: string
  userImage: string
  userId: string
  postId: number
  postBody: string
  postImage: string
  postCreatedAt: number
}

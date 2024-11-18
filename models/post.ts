export interface PostData {
  userId: number
  body: string
  image?: string
  createdAt: number
}

export interface Post extends PostData {
  id: number
}

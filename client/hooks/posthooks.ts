import { useQuery } from '@tanstack/react-query'
import * as api from '../apis/posts'

export function usePosts() {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: () => api.getAllPosts(),
  })
  return query
}

export function usePost(id: number) {
  const query = useQuery({
    queryKey: ['post', id],
    queryFn: () => api.getPostById(id),
  })
  return query
}

import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import * as api from '../apis/posts'

export function usePosts() {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: () => api.getAllPosts(),
  })
  console.log('getAllPosts', query)
  return query
}

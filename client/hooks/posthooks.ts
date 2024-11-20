import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import * as api from '../apis/posts'

export function usePosts() {
  const query = useQuery({
    queryKey: ['posts'],
    queryFn: () => api.getAllPosts(),
  })
  return query
}

export function usePost(id: string) {
  const query = useQuery({
    queryKey: ['post', id],
    queryFn: () => api.getPostById(id),
  })
  return { ...query, delete: usePostDelete() }
}

export function usePostMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })
  return mutation
}

export function usePostDelete() {
  return usePostMutation(api.deletePostById)
}

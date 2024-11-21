import { useQuery } from '@tanstack/react-query'
import * as API from '../apis/user.ts'

export function useUsers() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: () => API.getAllUsers(),
  })

  return {
    ...query,
  }
}

export function useUser(username: string | undefined) {
  const query = useQuery({
    enabled: Boolean(username),
    queryKey: ['user', username],
    queryFn: () => API.getUser(username!),
  })

  return {
    ...query,
  }
}
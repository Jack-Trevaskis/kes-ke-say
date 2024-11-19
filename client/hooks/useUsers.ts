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

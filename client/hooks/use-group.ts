import { useQuery } from '@tanstack/react-query'
import * as API from '../apis/group.ts'

export default function useGroup(id: number) {
  return useQuery({
    queryKey: ['groups', id], // Include `id` in the query key for caching
    queryFn: () => API.getGroupById(id), // Pass `id` to the API function
    enabled: !!id, // Ensures the query only runs when `id` is truthy
  })
}

import { useQuery } from '@tanstack/react-query'
// import request from 'superagent'
import * as API from '../apis/groups.ts'

export default function useGroups() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => API.getAllGroups(),
  })
}

import { useQuery } from '@tanstack/react-query'

// Mock account data
const account = {
  id: 2,
  auth0Id: 'auth0|234',
  username: 'ida',
  fullName: 'Ida Dapizza',
  location: 'Auckland',
  image: 'ava-02.png',
}

export function useAccount() {
  return useQuery({
    queryKey: ['account'],
    queryFn: () => account,
  })
}

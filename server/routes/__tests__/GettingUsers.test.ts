import { describe, it, expect, vi} from 'vitest'
import request from 'supertest'
import server from '../../server.ts'
import * as usersDb from '../../db/functions/users.ts'

vi.mock('../../db/functions/users.ts')

const mockUsers = [
    { id: 1, username: 'paige', location: 'Auckland', image: 'ava-03.png', auth0Id: 'auth0|123', fullName: 'bla324h' },
    { id: 2, username: 'ida', location: 'Auckland', image: 'ava-02.png', auth0Id: 'auth0|122', fullName: 'bla342h'},
    { id: 3, username: 'shaq', location: 'Christchurch', image: 'ava-16.png', auth0Id: 'auth0|143', fullName: 'bla343h'},
    { id: 4, username: 'chris', location: 'Wellington', image: 'ava-08.png', auth0Id: 'auth0|223', fullName: 'bla34h'}
]

describe('GET ap1/v1/users', () => {
  //happy path
  it('should show the users', async () => {
    vi.mocked(usersDb.getAllUsers).mockResolvedValue(mockUsers)
    const res = await request(server).get('/api/v1/users')

    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual(mockUsers)
  })
  //sad path
  it('should return an error if the database is down', async () => {
    vi.mocked(usersDb.getAllUsers).mockRejectedValue(new Error('Database is down'))
    const res = await request(server).get('/api/v1/users')
    expect(res.statusCode).toBe(500)
    expect(res.body).toEqual({ message: 'Cannot get all users' })
  })
})

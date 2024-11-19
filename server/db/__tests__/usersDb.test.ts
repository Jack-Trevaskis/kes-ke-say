import { beforeAll, beforeEach, expect, describe, it } from 'vitest'

import { getAllUsers } from '../functions/users'

import db from '../connection.ts'

beforeAll(async () => {
  await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})

describe('getAllUsers', () => {
  it('returns an array of all users', async () => {
    //arrange
    const exampleUser = {
      id: 1,
      username: 'paige',
      location: 'Auckland',
      image: 'ava-03.png',
    }
    //act
    const users = await getAllUsers()
    //assert
    expect(users).toHaveLength(4)
    expect(users[0]).toStrictEqual(exampleUser)
    expect(users[users.length - 1].username).toBe('chris')
  })
})

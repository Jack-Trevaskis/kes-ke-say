import {describe, it, expect, beforeAll, beforeEach, afterAll} from 'vitest'
import request from 'supertest'

import { db } from '../../db/functions/groups'    //our DB operations/functions
import server from '../../server.ts'    // our express server (backend API) <i class="fas fa-route-interstate    "></i>

beforeAll(async () => {
    await db.migrate.latest()
})

beforeEach(async () => {
  await db.seed.run()
})
  
afterAll(async() => {
    await db.destroy()
})


describe('Getting All Groups', () => {
  it('should return an array of groups', async () => {
    const response = await request(server).get('/api/v1/groups')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body).toMatchInlineSnapshot(`
      [
        {
          "id": 1,
          "image": "fries-darkgray.png",
          "name": "friendChips",
        },
        {
          "id": 2,
          "image": "car-darkgray.png",
          "name": "The fast and the curious",
        },
        {
          "id": 3,
          "image": "taco-darkgray.png",
          "name": "Taco bout it",
        },
      ]
    `)
  })
})
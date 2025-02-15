import knexFile from '../knexfile.js'
import knex from 'knex'

type Environment = 'production' | 'test' | 'development'
const environment = (process.env.NODE_ENV || 'development') as Environment

const config = knexFile[environment]
export const db = knex(config)

// - CRUD

export async function getAllGroups() {
  const groups = await db('groups')
  return groups
}

export async function getGroupById (id: number) {
    const group = await db('groups').where('id', id).first()
    return group
}

// Create


// Read

// Update

// Delete

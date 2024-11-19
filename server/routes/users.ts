import express from 'express'


const router = express.Router()
import * as db from '../db/functions/users.ts'

// GET /api/v1/users
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Cannot get all users' })
  }
})

// GET /api/v1/users/:username
router.get('/:username', async (req, res) => {
  const username = req.params.username
  if (!username) { return res.status(400).json({ message: 'Invalid id' }) }
  try {
    const user = await db.getUserByUsername(username)
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Cannot get user' })
  }
})

export default router

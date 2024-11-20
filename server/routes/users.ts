import express from 'express'
// import { User } from '../../models/user.ts'


const router = express.Router()
import * as db from '../db/functions/users.ts'

// GET /api/v1/users
router.get('/', async (req, res) => {
  try {
    const users = await db.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Cannot get all users' })
  }
})

// GET /api/v1/users/:username
router.get('/:username', async (req, res) => {
  const username = req.params.username
  try {
    const user = await db.getUserByUsername(username)
    if (!user) {
      return res.status(404).json({ message: `Cannot find user: ${username}`})
    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error: Unable to access user data.' })
  }
})

export default router

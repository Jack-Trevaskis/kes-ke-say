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
    console.log(error)
    res.status(500).json({ message: 'Cannot get all users' })
  }
})



export default router






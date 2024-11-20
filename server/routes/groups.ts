import express from 'express'
import * as db from '../db/functions/groups'

const router = express.Router()

// GET /api/v1/groups
router.get('/', async (req, res) => {
  // res.status(200).send('Hello from the groups route!')
  try {
    const groups = await db.getAllGroups()
    res.json(groups)
  } catch (err) {
    console.error('error')
  }
})

export default router

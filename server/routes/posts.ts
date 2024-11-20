import express from 'express'
import * as db from '../db/functions/posts'

const router = express.Router()

// GET /api/v1/posts
router.get('/', async (req, res) => {
  try {
    const result = await db.getAllPosts()
    res.json(result)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})

// GET /api/v1/posts/:id
router.get('/:id', async (req, res) => {
  try {
    const result = await db.getPostById(req.params.id)
    if (result === undefined) res.sendStatus(404)
    // console.log(result)
    res.json(result)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const result = await db.deletePost(req.params.id)
    if (result === 0) {
      res.sendStatus(404)
    } else res.sendStatus(204)

    // res.sendStatus(204)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    } else console.error('unknown error')
    res.sendStatus(500)
  }
})

export default router

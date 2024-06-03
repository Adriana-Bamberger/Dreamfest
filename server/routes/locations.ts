import express from 'express'
//imports eveything from the database
import * as db from '../db/index.ts'

const router = express.Router()

// GET /api/v1/locations
// Done: Replace this with all of the locations in the database
router.get('/', async (req, res, next) => {
  try {
    const locations = await db.getAllLocations()
    res.json({ locations })
  } catch (e) {
    next(e)
  }
})

// DONE: Get the location based on its id and replace this viewData
router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id)
  try {
    const location = await db.getLocationById(id)
    res.json(location)
  } catch (e) {
    next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { name, description } = req.body
    // TODO: call db.updateLocation with these details
    const amount = await db.updateLocation({ id, name, description })
    if (amount) {
      res.status(200).json({ updated: amount })
    } else {
      res.status(404).json({ message: '404 not found' })
    }
  } catch (e) {
    next(e)
  }
})

export default router

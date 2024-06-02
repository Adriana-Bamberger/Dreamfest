import express from 'express'
//imports eveything from the database
import * as db from '../db/index.ts'

const router = express.Router()

// GET /api/v1/locations
router.get('/', async (req, res, next) => {
  try {
    // Done: Replace this with all of the locations in the database
    const locations = await db.getAllLocations()
    res.json({ locations })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    // // DONE: Get the location based on its id and replace this viewData
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
    res.sendStatus(204)
  } catch (e) {
    next(e)
  }
})

export default router

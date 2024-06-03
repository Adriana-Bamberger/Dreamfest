import express from 'express'
import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()

// GET api/v1/schedule/friday
router.get('/:day', async (req, res, next) => {
  try {
    const day = validateDay(req.params.day)
    // TODO: replace this data with the results of calling db.getEventsByDay

    const display = await db.getEvById(day)
    res.json({ day, display })
  } catch (e) {
    next(e)
  }
})

export default router

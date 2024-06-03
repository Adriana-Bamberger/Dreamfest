import express from 'express'
import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()

// GET api/v1/schedule/friday
// DONE: replace this data with the results of calling db.getEventsByDay
router.get('/:day', async (req, res, next) => {
  try {
    const day = validateDay(req.params.day)
    const data = await db.getEventsByDay(day)
    res.json({ day, data })
  } catch (e) {
    next(e)
  }
})

export default router

import express from 'express'
import { validateDay } from './helpers.ts'
import * as db from '../db/index.ts'

const router = express.Router()
export default router

// Done: call your new db.addNewEvent function and use the returned ID
router.post('/', async (req, res, next) => {
  try {
    const { name, description, time, locationId } = req.body
    const day = validateDay(req.body.day)
    const id = await db.addNewEvent({
      locationId,
      day,
      time,
      name,
      description,
    })
    const url = `/api/v1/events/${id}`
    res.setHeader('Location', url)
    res.status(201).json({ location: url })
  } catch (e) {
    next(e)
  }
})
// DONE: DELETE the event with this matching ID
// Instructions don't call for status, but for incase it's best prastic apparently?
router.delete('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    await db.deleteEvent(id)
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
})

// DONE: Replace event below with the event from the database using its id
// NOTE: It should have the same shape as this one
// DONE: if there's no event with that id, respond with a 404 instead
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    // const event = {
    //   id: id,
    //   locationId: 1,
    //   day: 'friday',
    //   time: '2pm - 3pm',
    //   name: 'Slushie Apocalypse I',
    //   description:
    //     'This is totally a description of this really awesome event that will be taking place during this festival at the Yella Yurt. Be sure to not miss the free slushies cause they are rad!',
    // }
    const newEvent = await db.getEvById(id)
    if (newEvent) {
      res.status(200).json(newEvent)
    } else {
      res.status(404).json({ message: '404 not found' })
    }
  } catch (e) {
    next(e)
  }
})
// DONE: UPDATE the event in the db with the matching ID using these details,
// if no event has a matching id, respond with a 404 instead
router.patch('/:id', async (req, res, next) => {
  try {
    const { name, description, time } = req.body
    const id = Number(req.body.id)
    const day = validateDay(req.body.day)
    const locationId = Number(req.body.locationId)
    const updateEvent = { id, locationId, day, time, name, description }
    const amount = await db.changeEvent(updateEvent)
    if (amount) {
      res.status(200).json({ changed: amount })
    } else {
      res.status(404).json({ message: '404 no event has matching id' })
    }
  } catch (e) {
    next(e)
  }
})

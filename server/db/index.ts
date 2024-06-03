import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location } from '../../models/Location.ts'
import {
  Event,
  EventData,
  changeFromEventData,
  changeToEvent,
  changeFromEvent,
} from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

// Done: replace this with your knex query
export async function getAllLocations() {
  const locations = await connection('locations')
  return locations as Location[]
}

export async function getEventsByDay(day: string) {
  const events = await connection('locations')
    .join('events', 'locations.id', 'events.location_id')
    .where({ day })
    .select(
      'events.id as id',
      'events.day',
      'events.time',
      'events.name as eventName',
      'events.description',
      'locations.name as locationName',
    )

  return events as Event[]
}

export async function getLocationById(id: number) {
  const location = await connection('locations').where({ id }).first()
  return location as Location
}

export async function updateLocation(updatedLocation: Location) {
  const { id, name, description } = updatedLocation
  const amount = await connection('locations')
    .where({ id })
    .update({ name, description })
  return amount
}

export async function addNewEvent(eventData: EventData) {
  const id = await connection('events').insert(
    { ...changeFromEventData(eventData) },
    ['id'],
  )
  return id
}

export async function deleteEvent(id: number) {
  const amount = await connection('event').where({ id }).delete()
  return amount
}

export async function getEvById(id: number) {
  const newEvent = await connection('events').where({ id }).first()
  return changeToEvent(newEvent)
}
// got the spreading trick from alex, works great!
export async function changeEvent(changeEvent: Event) {
  const { id, ...newEventData } = changeFromEvent(changeEvent)
  const amount = await connection('events')
    .where({ id })
    .update({ ...newEventData })
  return amount
}

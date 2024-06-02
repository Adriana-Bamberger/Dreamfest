import knexFile from './knexfile.js'
import knex from 'knex'
import type { Location, LocationData } from '../../models/Location.ts'
import type {
  Event,
  EventWithLocation,
  EventData,
  changeFromEventData,
  changeToEvent,
  changeFromEvent,
} from '../../models/Event.ts'

type Environment = 'production' | 'test' | 'development'

const environment = (process.env.NODE_ENV || 'development') as Environment
const config = knexFile[environment]
export const connection = knex(config)

export async function getAllLocations() {
  // Done: replace this with your knex query
  const locations = await connection('locations').select()

  return locations as Location[]
}

export async function getEventsByDay(day: JSON) {
  const events = await connection('events')
    .join('locations', 'events.location_id', 'locations.id')
    .where({ day })
    .select(
      'event.id',
      'events.day',
      'events.time',
      'events.name as eventName',
      'events.description',
      'events.location_id as locationName',
    )

  return events as Event[]
}

export async function getLocationById(id: number) {
  const location = await connection('locations').where({ id }).first()
  return location as Location
}

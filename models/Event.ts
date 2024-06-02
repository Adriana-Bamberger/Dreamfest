export interface EventData {
  locationId: number
  day: string
  time: string
  name: string
  description: string
}

export interface EventWithLocation {
  id: number
  locationName: string
  eventName: string
  day: string
  time: string
  description: string
}

export interface Event extends EventData {
  id: number
}
// Above are the ones that where already here, 
// Heres my ones
export interface DbEventData {
  location_id: number
  day: string
  time: string
  name: string
  description: string
}

export interface DbEvent extends DbEventData {
  id: number
}

 // the ones I needed Gemini's help with the syntax for, fixxed the error.
export function changeFromEventData(eventData: EventData): DbEventData {
  const { day, time, name, description } = eventData
  const location_id = Number(eventData.locationId)
  return { location_id, day, time, name, description } as DbEventData
}

export function changeToEvent(event: DbEvent): Event {
  const { id, day, time, name, description } = event
  const locationId = Number(event.location_id)
  return { id, locationId, day, time, name, description } as Event
}
export function changeFromEvent(event: Event): DbEvent {
  const { id, day, time, name, description } = event
  const location_id = Number(event.locationId)
  return { id, location_id, day, time, name, description } as DbEvent
}


import { describe, beforeEach, beforeAll, it, expect, test } from 'vitest'
import { connection, getEventsByDay } from '../index.ts'
import request from 'supertest'
import server from '../../server.ts'

beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('schedule', () => {
  it('has a bunch of events', async () => {
    const data = await getEventsByDay('friday')
    expect(data).toMatchInlineSnapshot(`
      [
        {
          "day": "friday",
          "description": "This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!",
          "eventName": "Slushie Apocalypse I",
          "id": 1,
          "locationId": 1,
          "locationName": "TangleStage",
          "location_id": 1,
          "name": "TangleStage",
          "time": "2pm - 3pm",
        },
        {
          "day": "friday",
          "description": "This event will be taking place at the Yella Yurt. Come see what marvels our championship builders have built over the past 7 days!",
          "eventName": "LEGO Builder Championships",
          "id": 2,
          "locationId": 2,
          "locationName": "Yella Yurt",
          "location_id": 2,
          "name": "Yella Yurt",
          "time": "6pm - 7pm",
        },
      ]
    `)
  })
})

test("When deleted no longer found in db /api/v1/events'", async () => {
  // Call the delete
  const response = await request(server).delete('/api/v1/events/1')
  // Expect it finds it and does the thing
  expect(response.statusCode).toBe(201)
  // Call the same one
  const newResponse = await request(server).get('/api/v1/events/1')
  //Cross-your-fingers-hope-to-die-stick-a-cup-cake-in-your-eye that it's not in the db anymore
  expect(newResponse.statusCode).toBe(404)
})

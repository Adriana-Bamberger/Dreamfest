import { setupApp } from './setup.tsx'
import { beforeAll, describe, it, expect } from 'vitest'
import nock from 'nock'

//Opening nock from Daph's hivemind
beforeAll(() => {
  nock.disableNetConnect()
})

//Setting up our fake data
const event = {
  id: 1,
  locationId: 1,
  day: 'friday',
  time: '2pm - 3pm',
  name: 'Test Event',
  description:
    'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
}

// Test Header
describe('The Edit Event Page', () => {
  // Test pt 1
  it('should get an event when going to specific route', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/events/1')
      .reply(200, event)

    const screen = setupApp('/events/1/edit')
    const heading = await screen.findByRole('heading', { level: 2 })
    // Expects
    expect(heading.textContent).toContain('Test Event')
    expect(heading).toBeVisible()

    expect(scope.isDone()).toBe(true)
  })
  // Test pt 2
  it('should delete an event when button is clicked', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/events/1') // backend api.
      .reply(200, event)
    const { user, ...screen } = setupApp('/events/1/edit')
    const button = await screen.findByRole('button', { name: 'Delete event' })
    // Expects
    expect(button).toBeVisible()
    expect(scope.isDone()).toBe(true)
    // Test pt 2.2
    const deleteScope = nock('http://localhost')
      .delete('/api/v1/events/1')
      .reply(201)
    await user.click(button)
    // Expects
    expect(deleteScope.isDone()).toBe(true)
  })
})

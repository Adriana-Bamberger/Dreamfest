import { setupApp } from './setup'
import { beforeAll, describe, it, expect } from 'vitest'
import nock from 'nock'

//use the besfore all daph told us about
beforeAll(() => {
  nock.disableNetConnect()
})

//Setting up our fake event.
const event = {
  id: 1,
  locationId: 1,
  day: 'friday',
  time: '2pm - 3pm',
  name: 'Test Event',
  description:
    'This event will be taking place at the TangleStage. Be sure to not miss the free slushies cause they are rad!',
}

describe('Our Edit Event Page', () => {
  // Test pt 1
  it('go to the matching event when clicked on the route link', async () => {
    //Setting up
    const scope = nock('http://localhost')
      .get('/api/v1/events/1')
      .reply(200, event)
    const screen = setupApp('/events/1/edit')
    const heading = await screen.findAllByRole('heading', { level: 2 })

    //Expect
    expect(heading.textContent).toContain('Test Event')
    expect(heading).toBeVisible()

    expect(scope.isDone()).toBe(true)
  })
  // Test pt 2
  it('deleate event on button click', async () => {
    //Setting up
    const scope = nock('http://localhost')
      .get('/api/v1/events/1')
      .reply(200, event)
    const { user, ...screen } = setupApp('/events/1/edit')
    const button = await screen.findAllByRole('button', {
      name: 'Delete event',
    })
    //Expect
    expect(button).toBeVisible()
    expect(scope.isDone()).toBe(true)

    const deleteScope = nock('http://localhost')
      .delete('/api/v1/events/1')
      .reply(201)

    await user.click(button)
    //Expect
    expect(deleteScope.isDone()).toBe(true)
  })
})

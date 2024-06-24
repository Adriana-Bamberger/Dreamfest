// import React from 'react'
// import { render, fireEvent } from '@testing-library/react'
// import { useNavigate } from 'react-router-dom'
// import EditEvent from '../components/EditEvent'

// import useDeleteEvent, {
//   useDeleteEvent as mockUseDeleteEvent,
// } from '../hooks/use-delete-event'
import { setupApp } from './setup'
import { it, expect } from 'vitest'
import nock from 'nock'

it('should delete an event when the delete button is clicked', async () => {
  //ARRANGE
  const scope = nock('http://localhost')
    .get('/api/v1/events/2/edit')
    .reply(200, {
      event,
    })

  const { user, ...screen } = setupApp('/events/2/edit')

  //ACT

  const button = await screen.findByText('Delete event')
  await user.click(button)
  expect(scope.isDone()).toBe(true)

  //ASSERT
  expect(event).toHaveLength(1)
})

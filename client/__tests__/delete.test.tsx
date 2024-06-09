import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import EditEvent from '../components/EditEvent'
import nock from 'nock'
import useDeleteEvent, {
  useDeleteEvent as mockUseDeleteEvent,
} from '../hooks/use-delete-event'

jest.mock('../hooks/use-delete-event', () => ({
  useDeleteEvent: jest.fn(),
}))

test('Does my delete button work?', async () => {
  const mockNavigate = jest.fn()
  const id = 1
  nock('http://localhost').delete(`/api/v1/events/${id}`).reply(200)

  const { getByText } = render(
    <EditEvent navigate={mockNavigate} useDeleteEvent={mockUseDeleteEvent} />,
  )

  const deleteButton = getByText(/Delete event/i)
  await fireEvent.click(deleteButton)

  expect(mockUseDeleteEvent).toHaveBeenCalledTimes(1)
  expect(mockNavigate).toHaveBeenCalledWith('/schedule/friday')
})

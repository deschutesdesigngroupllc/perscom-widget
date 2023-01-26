import React from 'react'
import { render, screen } from '@testing-library/react'
import Roster from './Roster'

test('renders learn react link', () => {
  render(<Roster />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

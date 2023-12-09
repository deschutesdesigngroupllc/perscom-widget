import React from 'react'
import { render, screen } from '@testing-library/react'
import Awards from './AwardsList'

test('renders learn react link', () => {
  render(<Awards />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

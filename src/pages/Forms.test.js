import React from 'react'
import { render, screen } from '@testing-library/react'
import Forms from './Forms'

test('renders learn react link', () => {
  render(<Forms />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

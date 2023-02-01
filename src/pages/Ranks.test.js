import React from 'react'
import { render, screen } from '@testing-library/react'
import Ranks from './Ranks'

test('renders learn react link', () => {
  render(<Ranks />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

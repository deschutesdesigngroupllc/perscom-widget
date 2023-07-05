import React from 'react'
import { render, screen } from '@testing-library/react'
import Newsfeed from './Newsfeed'

test('renders learn react link', () => {
  render(<Newsfeed />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

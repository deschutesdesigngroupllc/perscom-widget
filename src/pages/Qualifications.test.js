import React from 'react'
import { render, screen } from '@testing-library/react'
import Qualifications from './Qualifications'

test('renders learn react link', () => {
  render(<Qualifications />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

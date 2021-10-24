import { render, screen } from '@testing-library/react'
import React from 'react'
import Test from '../pages/test-page'

describe('TEst', () => {
  it('renders a heading', () => {
    render(<Test />)

    const heading = screen.getByRole('heading', {
      name: /welcome to testing/i,
    })

    expect(heading).toBeInTheDocument()
  })
})

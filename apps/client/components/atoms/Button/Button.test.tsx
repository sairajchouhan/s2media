import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Tests for button component', () => {
  it('Should render the button component', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', {
      name: 'Click me',
    })
    const loader = screen.queryByTestId('button-loader')
    expect(loader).not.toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('Check for disabled state of button when `disabled` prop is passed', () => {
    render(<Button disabled>Click me</Button>)
    const button = screen.getByRole('button', {
      name: 'Click me',
    })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('check for loading state of a button', () => {
    render(<Button loading={true}>Click me</Button>)
    const button = screen.getByRole('button', {
      name: 'Click me',
    })
    const loader = screen.getByTestId('button-loader')

    expect(button).toBeInTheDocument()
    expect(loader).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
})

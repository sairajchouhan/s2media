import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Input Atom Test', () => {
  it('should render the Input', () => {
    render(<Input id="input" placeholder="my placeholder" />)
    const input = screen.getByPlaceholderText('my placeholder')
    expect(input).toBeInTheDocument()
  })

  it('should be able to take input', () => {
    render(<Input id="input" placeholder="my placeholder" />)
    const input = screen.getByPlaceholderText('my placeholder')

    fireEvent.change(input, { target: { value: 'hi' } })
    // @ts-ignore
    expect(input.value).toBe('hi')
  })

  it('should correctly show errors ', () => {
    const errorText = 'you got a error'
    render(<Input id="input" placeholder="my placeholder" error={true} errorText={errorText} />)

    const errorNode = screen.getByText(`*${errorText}`)
    expect(errorNode).toHaveTextContent(`*${errorText}`)
  })
})

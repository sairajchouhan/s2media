import { render, screen } from '@testing-library/react'
import { Avatar } from './avatar'

describe('testing avatar', () => {
  test('should render avatar with src', () => {
    render(<Avatar alt="avatar" src="https://random.com" />)
    const imageEle = screen.getByAltText('avatar')
    expect(imageEle).toBeInTheDocument()
  })

  test('when src if null, should render a <svg>', () => {
    render(<Avatar />)
    const imageEle = screen.getByAltText('Deafult User Profile')
    expect(imageEle).toBeInTheDocument()
  })
})

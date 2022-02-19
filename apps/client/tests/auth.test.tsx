import LoginPage from '../pages/login'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { Input } from '../components/atoms/Input'

const Comp = () => {
  const [data, setData] = useState({
    email: '',
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(data)
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }
  console.log(data)

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="jay@shetty.com"
        value={data.email}
        onChange={handleChange}
      />
    </div>
  )
}

describe('testing login functionality', () => {
  it('should work', () => {
    render(<Comp />)
    const email = screen.getByLabelText(/email/i)

    userEvent.type(email, 'sairaj2119@gmial.com')

    screen.debug(email)
  })
})

import LoginPage from '../pages/login'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('testing login functionality', () => {
  it('should work', () => {
    render(<LoginPage />)

    const emailInput = screen.getByRole('textbox', {
      name: /email/i,
    })
    const passwordInput = screen.getByLabelText(/password/i)
    const submit = screen.getByText(/submit/i)

    userEvent.type(emailInput, 'test@gmail.com')
    userEvent.type(passwordInput, 'aunzbedi')
    userEvent.click(submit)
  })
})

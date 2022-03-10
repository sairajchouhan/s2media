import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LoginPage from '../pages/login'
import { noAuthRender } from './utils'
describe('testing login functionality', () => {
  it('should work', async () => {
    noAuthRender(<LoginPage />)

    const emailInput = await screen.findByRole('textbox', {
      name: /email/i,
    })
    const passwordInput = await screen.findByLabelText(/password/i)
    const submit = await screen.findByText(/submit/i)

    userEvent.type(emailInput, 'test@gmail.com')
    userEvent.type(passwordInput, 'aunzbedi')
    userEvent.click(submit)
  })
})

import React, { useState } from 'react'
import { Button } from '../../components/atoms/Button'
import UnAuthenticatedLayout from '../../components/layouts/UnAuthenticatedLayout'
import { useAuth } from '../../context/authContext'
import { providerNames } from '../../utils/oAuthProviders'

const Login = () => {
  const { login, oAuthLogin } = useAuth()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  const handleLogin = async () => {
    if (!data.email || !data.password || data.password.trim() === '' || data.email.trim() === '') {
      return
    }
    try {
      setLoading(true)
      await login(data.email, data.password)
    } catch (err) {
      console.error(err)
    }
  }

  const handleOAuthLogin = async (providerName: string) => {
    await oAuthLogin(providerName)
  }

  return (
    <UnAuthenticatedLayout>
      <div className="flex flex-col items-center">
        <h1 className="my-4 text-5xl">Login</h1>
        <div className="flex flex-col w-1/3">
          <div className="mb-5">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              value={data.email}
              onChange={handleChange}
              type="text"
              id="email"
              name="email"
              className="w-full rounded-lg"
            />
          </div>
          <div className="mb-8">
            <label htmlFor="passowrd">Password</label>
            <input
              value={data.password}
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              className="w-full rounded-lg"
            />
          </div>
          <Button onClick={handleLogin} loading={loading} className="py-2" colorScheme="green">
            Submit
          </Button>
          <span className="my-4"></span>
          <Button
            onClick={() => handleOAuthLogin(providerNames.google)}
            loading={loading}
            className="py-2"
            colorScheme="green"
          >
            Login With Google
          </Button>
        </div>
      </div>
    </UnAuthenticatedLayout>
  )
}

export default Login

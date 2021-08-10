import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button } from '../../components/atoms/Button'
import { useAuth } from '../../context/authContext'

const Login = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [data, setData] = useState({
    email: 'sairaj2119@gmail.com',
    password: 'aunzbedi',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  const handleLogin = async () => {
    console.log(data)
    if (!data.email || !data.password || data.password.trim() === '' || data.email.trim() === '') {
      return
    }
    try {
      const res = await login(data.email, data.password)
      router.push('/home')
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }

  return (
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
        <Button onClick={handleLogin} className="py-2" colorScheme="green">
          Submit
        </Button>
      </div>
    </div>
  )
}

export default Login

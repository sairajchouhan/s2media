import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Button } from '../../components/atoms/Button'
import UnAuthenticatedLayout from '../../components/layouts/UnAuthenticatedLayout'
import { useAuth } from '../../context/authContext'

const Signup = () => {
  const { signup } = useAuth()
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  const handleSignup = async () => {
    console.log(data)
    if (!data.email || !data.password || data.password.trim() === '' || data.email.trim() === '') {
      return
    }
    try {
      const res = await signup(data.email, data.password)
      router.push('/home')
      console.log(res)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <UnAuthenticatedLayout>
      <div className="flex flex-col items-center">
        <h1 className="my-4 text-5xl">Signup</h1>
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
          <Button onClick={handleSignup} className="py-2" colorScheme="green">
            Submit
          </Button>
        </div>
      </div>
    </UnAuthenticatedLayout>
  )
}

export default Signup

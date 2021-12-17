import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/atoms/Button'
import { Input } from '../../components/atoms/Input/Input'
import UnAuthenticatedLayout from '../../components/layouts/UnAuthenticatedLayout'
import { useAuth } from '../../context/authContext'
import { providerNames } from '../../utils/oAuthProviders'
import Link from 'next/link'
import { internet } from 'faker'

const Signup = () => {
  const { signup, oAuthLogin } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({ isError: false, message: '' })
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (error.isError) {
      setTimeout(() => {
        setError({ isError: false, message: '' })
      }, 5000)
    }
  }, [error.isError])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  const handleSignup = async () => {
    console.log(data)
    if (!data.email || !data.password || data.password.trim() === '' || data.email.trim() === '') {
      return setError({ isError: true, message: 'Please fill in all fields' })
    }
    try {
      setError({ isError: false, message: '' })
      setLoading(true)
      await signup(data.email, data.password)
    } catch (err) {
      console.error(err)
      setError({ isError: true, message: (err as any).message })
      setLoading(false)
    }
  }

  const handleOAuthSignup = async (providerName: string) => {
    await oAuthLogin(providerName)
  }

  const generateRandomCredentials = () => {
    console.log('double clicked')
    const email = internet.email()
    const password = internet.password()
    setData({
      email,
      password,
    })
  }

  return (
    <UnAuthenticatedLayout>
      <Head>
        <title>SignUp / S2Media</title>
      </Head>
      <div className="flex flex-col items-center" style={{ height: 'calc(100vh - 58px)' }}>
        <h1 className="mt-8 font-semibold text-gray-700 text-7xl">Signup</h1>
        <div className="my-8">
          <button
            onDoubleClick={generateRandomCredentials}
            className="px-2 py-1 bg-gray-200 rounded cursor-pointer hover:underline"
          >
            Double Click me
          </button>{' '}
          to Generate random credentails
        </div>
        <div className="flex flex-col max-w-full w-96">
          {error.isError ? (
            <div className="p-3 my-3 text-sm text-white bg-red-500 rounded-md">{error.message}</div>
          ) : null}
          <div className="mb-5">
            <Input
              id="email"
              name="email"
              label="Email"
              type="text"
              placeholder="jay@shetty.com"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-5">
            <Input
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2"></div>
          <Button onClick={handleSignup} loading={loading} className="" colorScheme="indigo">
            Submit
          </Button>
          <div className="my-3"></div>
          <Button onClick={() => handleOAuthSignup(providerNames.google)} variant="outline">
            <div className="flex items-center justify-center">
              <Image src="/google.svg" alt="Google" width="25" height="25" />
              <p className="ml-3">Signup With Google</p>
            </div>
          </Button>
          <div className="flex justify-center mt-4 text-sm text-gray-500">
            <p className="mr-1">Already have an account? </p>
            <Link href="/login">
              <a className="font-medium hover:underline">Login</a>
            </Link>
          </div>
        </div>
      </div>
    </UnAuthenticatedLayout>
  )
}

export default Signup

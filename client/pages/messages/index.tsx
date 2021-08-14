import React, { useState } from 'react'
import { Input } from '../../components/atoms/Input'
import { PageNav } from '../../components/molecules/Page'

const Messages = () => {
  // const { user } = useAuth()
  const [data, setData] = useState({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  console.log(data)

  return (
    <div className="min-h-screen border-l border-r border-opacity-80">
      <PageNav title="Messages" />
      <main className="px-2 mt-5">
        <Input
          id="email"
          name="email"
          label="Email"
          type="text"
          placeholder="jay@shetty.com"
          error={false}
          errorText={'This is worse '}
          value={data.email}
          onChange={handleChange}
        />
        <div className="my-4"></div>
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          error={false}
          errorText={'password is wrong'}
          value={data.password}
          onChange={handleChange}
        />
      </main>
    </div>
  )
}

export default Messages

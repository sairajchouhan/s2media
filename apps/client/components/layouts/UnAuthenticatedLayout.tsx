import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import Nav from '../organisms/Nav'

const UnAuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { rqUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (rqUser) {
      router.push('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!rqUser ? (
        <>
          <header>
            <Nav />
          </header>
          <section className="container w-5/6 mx-auto">{children}</section>
        </>
      ) : null}
    </>
  )
}

export default UnAuthenticatedLayout

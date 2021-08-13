import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import Nav from '../organisms/Nav'

const UnAuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!user && (
        <>
          <header>
            <Nav />
          </header>
          <section className="container w-3/4 mx-auto">{children}</section>
        </>
      )}
    </>
  )
}

export default UnAuthenticatedLayout

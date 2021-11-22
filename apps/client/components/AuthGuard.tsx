import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../context/authContext'

const AuthGaurdOn = ({ children }: { children: React.ReactNode }) => {
  const { rqUser } = useAuth()

  const router = useRouter()
  useEffect(() => {
    if (!rqUser) {
      router.push('/login')
    }
  }, [rqUser, router])

  return <>{rqUser && children}</>
}

export default AuthGaurdOn

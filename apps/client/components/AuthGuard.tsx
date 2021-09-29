import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../context/authContext'

const AuthGaurdOn = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()

  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  return <>{user && children}</>
}

export default AuthGaurdOn

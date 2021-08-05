import { useRouter } from 'next/router'
import React from 'react'
import { useUser } from '../hooks/useUser'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser()
  const { push } = useRouter()

  // if (loading) return null

  if (!user) {
    push('/')
    return null
  }

  return <>{children}</>
}

export default PrivateRoute

import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React from 'react'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, loading] = useSession()
  const { push } = useRouter()

  if (loading) return null

  if (!loading && !session) {
    push('/auth/login')
    return null
  }
  return <>{children}</>
}

export default PrivateRoute

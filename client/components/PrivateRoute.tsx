import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React from 'react'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [session, loading] = useSession()
  const { push } = useRouter()
  console.log(session)

  if (loading) return null

  if (!session) {
    push('/')
    return null
  }

  return <>{children}</>
}

export default PrivateRoute

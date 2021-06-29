import { useSession } from 'next-auth/client'
import React from 'react'
import AuthenticatedLayout from './AuthenticatedLayout'
import UnAuthenticatedLayout from './UnAuthenticatedLayout'

const Layout = ({ children }: { session?: any; children: React.ReactNode }) => {
  const [session, loading] = useSession()
  if (loading) return null
  return (
    <>
      {session ? (
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      ) : (
        <UnAuthenticatedLayout>{children}</UnAuthenticatedLayout>
      )}
    </>
  )
}

export default Layout

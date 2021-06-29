import { useSession } from 'next-auth/client'
import React from 'react'
import AuthenticatedLayout from './AuthenticatedLayout'
import UnAuthenticatedLayout from './UnAuthenticatedLayout'

const Layout = ({ children }: { session?: any; children: React.ReactNode }) => {
  const [session] = useSession()
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

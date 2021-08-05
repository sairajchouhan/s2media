import React from 'react'
import { useUser } from '../../hooks/useUser'
import AuthenticatedLayout from './AuthenticatedLayout'
import UnAuthenticatedLayout from './UnAuthenticatedLayout'

const Layout = ({ children }: { session?: any; children: React.ReactNode }) => {
  const user = useUser()
  // if (loading) return null
  return (
    <>
      {false ? (
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      ) : (
        <UnAuthenticatedLayout>{children}</UnAuthenticatedLayout>
      )}
    </>
  )
}

export default Layout

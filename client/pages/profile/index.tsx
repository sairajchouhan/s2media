import React from 'react'
import { PageNav } from '../../components/molecules/PageNav/page-nav'
import PrivateRoute from '../../components/PrivateRoute'
import { useUser } from '../../hooks/useUser'

const Profile = () => {
  const user = useUser()
  if (!user) return null
  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Profile" subtitle={`@${user.username}`} />
        <main className="px-2">messages</main>
      </div>
    </PrivateRoute>
  )
}

export default Profile

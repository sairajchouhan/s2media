import React from 'react'
import { PageNav } from '../../components/molecules/Page/page-nav'
import PrivateRoute from '../../components/PrivateRoute'

const Settings = () => {
  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Settings" />
        <main className="px-2">settings</main>
      </div>
    </PrivateRoute>
  )
}

export default Settings

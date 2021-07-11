import React from 'react'
import { PageNav } from '../../components/molecules/PageNav'
import PrivateRoute from '../../components/PrivateRoute'

const Messages = () => {
  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Messages" />
        <main className="px-2">messages</main>
      </div>
    </PrivateRoute>
  )
}

export default Messages

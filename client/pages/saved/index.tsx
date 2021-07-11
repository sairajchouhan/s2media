import React from 'react'
import { PageNav } from '../../components/molecules/PageNav/page-nav'
import PrivateRoute from '../../components/PrivateRoute'

const Saved = () => {
  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Saved" />
        <main className="px-2">Saved Posts</main>
      </div>
    </PrivateRoute>
  )
}

export default Saved

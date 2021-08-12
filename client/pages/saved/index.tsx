import React from 'react'
import AuthenticatedLayout from '../../components/layouts/AuthenticatedLayout'
import { PageNav } from '../../components/molecules/Page/page-nav'

const Saved = () => {
  return (
    <AuthenticatedLayout>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Saved" />
        <main className="px-2">Saved Posts</main>
      </div>
    </AuthenticatedLayout>
  )
}

export default Saved

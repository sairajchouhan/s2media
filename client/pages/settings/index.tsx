import React from 'react'
import AuthenticatedLayout from '../../components/layouts/AuthenticatedLayout'
import { PageNav } from '../../components/molecules/Page/page-nav'

const Settings = () => {
  return (
    <AuthenticatedLayout>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Settings" />
        <main className="px-2">settings</main>
      </div>
    </AuthenticatedLayout>
  )
}

export default Settings

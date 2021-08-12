import React from 'react'
import AuthenticatedLayout from '../../components/layouts/AuthenticatedLayout'
import { PageNav } from '../../components/molecules/Page/page-nav'

const Notifications = () => {
  return (
    <AuthenticatedLayout>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Notifications" />
        <main className="px-2">hi thre</main>
      </div>
    </AuthenticatedLayout>
  )
}

export default Notifications

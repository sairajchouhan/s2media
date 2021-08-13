import React from 'react'
import { PageNav } from '../../components/molecules/Page/page-nav'

const Saved = () => {
  return (
    <div className="min-h-screen border-l border-r border-opacity-80">
      <PageNav title="Saved" />
      <main className="px-2">Saved Posts</main>
    </div>
  )
}

export default Saved

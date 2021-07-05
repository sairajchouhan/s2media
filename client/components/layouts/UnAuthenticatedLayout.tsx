import React from 'react'
import Nav from '../organisms/Nav'

const UnAuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>
        <Nav />
      </header>
      <section className="container w-3/4 mx-auto">{children}</section>
    </div>
  )
}

export default UnAuthenticatedLayout

import React from 'react'
import LeftNav from '../LeftNav'
import RightNav from '../RightNav'

const Layout = ({ children }) => {
  return (
    <div className="bg-blue-50">
      <section className="fixed">
        <LeftNav />
      </section>
      <section className="ml-60 mr-80">{children}</section>
      <section className="fixed top-0 right-0">
        <RightNav />
      </section>
    </div>
  )
}

export default Layout

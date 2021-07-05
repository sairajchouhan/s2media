import React from 'react'
import LeftNav from '../organisms/LeftNav'
import RightNav from '../organisms/RightNav'

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <div className="flex w-5/6 mx-auto">
        <header className="relative z-10 flex flex-col items-end flex-shrink">
          <div className="relative flex flex-col items-end flex-shrink-0 w-72">
            <div className="fixed top-0 z-0 flex flex-col items-stretch flex-shrink-0 h-full">
              <LeftNav />
            </div>
          </div>
        </header>
        <div className="grid w-full grid-cols-12 gap-6">
          <div className="min-h-screen col-span-8 ml-6">{children}</div>
          <div className="col-span-4 bg-gray-50">
            <RightNav />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthenticatedLayout

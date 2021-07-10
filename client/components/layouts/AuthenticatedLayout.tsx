import React from 'react'
import LeftNav from '../organisms/LeftNav'
import RightNav from '../organisms/RightNav'

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full">
      <div className="flex w-3/4 mx-auto">
        <header className="relative z-10 flex flex-col items-end flex-shrink mr-10">
          <div className="relative flex flex-col items-end flex-shrink-0 w-64">
            <div className="fixed top-0 z-0 flex flex-col items-stretch flex-shrink-0 h-full">
              <LeftNav />
            </div>
          </div>
        </header>
        <div className="grid w-full grid-cols-[24] gap-10">
          <div className="min-h-screen col-span-[12]">{children}</div>
          <div className="col-span-2 bg-gray-50">
            <RightNav />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthenticatedLayout

import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import LeftNav from '../organisms/LeftNav'
import RightNav from '../organisms/RightNav'

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])

  return (
    user && (
      <div className="w-full">
        <div className="flex w-3/4 mx-auto">
          <header className="relative z-10 flex flex-col items-end flex-shrink mr-10">
            <div className="relative flex flex-col items-end flex-shrink-0 w-64">
              <div className="fixed top-0 z-0 flex flex-col items-stretch flex-shrink-0 h-full">
                <LeftNav />
              </div>
            </div>
          </header>
          <div className="grid w-full grid-cols-12 gap-10">
            <div className="min-h-screen col-span-8">{children}</div>
            <div className="col-span-4 bg-gray-50">
              <RightNav />
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default AuthenticatedLayout

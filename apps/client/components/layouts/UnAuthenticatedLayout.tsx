import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import Nav from '../organisms/Nav'
import { Footer } from '../molecules/Footer'

const UnAuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
  const { rqUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (rqUser) {
      router.push('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!rqUser ? (
        <>
          <header>
            {/* <header className="bg-gradient-to-r from-blue-500 to-pink-500/90 px-4 py-2 text-white text-center">
              <h1>
                As much I would love to put this project on, but it&apos;s costing me server
                charges. I may again resume the project in future Thanks for visiting
                <br />
                you can always run the project locally by following the instructions in{' '}
                <a
                  href="https://github.com/sairajchouhan/s2media/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline cursor-pointer"
                >
                  README{' '}
                </a>
              </h1>
            </header> */}
            <Nav />
          </header>
          <section className="container w-5/6 mx-auto">{children}</section>
          <Footer />
        </>
      ) : null}
    </>
  )
}

export default UnAuthenticatedLayout

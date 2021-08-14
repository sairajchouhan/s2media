import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout'
import { AuthContextProvider } from '../context/authContext'
import '../styles/globals.css'

const noAuthRequiredPages = ['/login', '/signup', '/']

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <AuthContextProvider>
      {noAuthRequiredPages.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <AuthenticatedLayout>
          <Component {...pageProps} />
        </AuthenticatedLayout>
      )}
    </AuthContextProvider>
  )
}
export default MyApp

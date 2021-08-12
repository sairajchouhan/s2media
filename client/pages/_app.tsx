import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { AuthContextProvider } from '../context/authContext'
import '../styles/globals.css'

const noAuthRequiredPages = ['/', '/login', '/signup']

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}
export default MyApp

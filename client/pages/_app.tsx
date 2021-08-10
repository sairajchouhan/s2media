import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Layout from '../components/layouts/Layout'
import { AuthContextProvider } from '../context/authContext'
import '../styles/globals.css'

const noAuthRequiredPages = ['/', '/login', '/signup']

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  console.log(router.pathname)
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  )
}
export default MyApp

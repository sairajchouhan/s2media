import type { AppProps } from 'next/app'
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout'
import UnAuthenticatedLayout from '../components/layouts/UnAuthenticatedLayout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const isAuthenticated = false
  const Layout = isAuthenticated ? AuthenticatedLayout : UnAuthenticatedLayout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout'
import UnAuthenticatedLayout from '../components/layouts/UnAuthenticatedLayout'

function MyApp({ Component, pageProps }: AppProps) {
  const isAuthenticated = true
  const Layout = isAuthenticated ? AuthenticatedLayout : UnAuthenticatedLayout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp

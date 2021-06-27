import AuthenticatedLayout from '../components/layouts/Layout'
import UnAuthenticatedLayout from '../components/layouts/UnAuthenticatedLayout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const isAuthenticated = true
  const Layout = isAuthenticated ? AuthenticatedLayout : UnAuthenticatedLayout
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp

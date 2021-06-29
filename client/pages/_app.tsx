import { Provider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import Layout from '../components/layouts/Layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
export default MyApp

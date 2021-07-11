import { Provider } from 'next-auth/client'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from '../components/layouts/Layout'
import '../styles/globals.css'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </Provider>
  )
}
export default MyApp

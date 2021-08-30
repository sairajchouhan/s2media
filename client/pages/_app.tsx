import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout'
import { AuthContextProvider } from '../context/authContext'
import '../styles/globals.css'

const noAuthRequiredPages = ['/login', '/signup', '/']

const queryClient = new QueryClient({})

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {noAuthRequiredPages.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <AuthenticatedLayout>
            <Component {...pageProps} />
          </AuthenticatedLayout>
        )}
      </AuthContextProvider>
    </QueryClientProvider>
  )
}
export default MyApp

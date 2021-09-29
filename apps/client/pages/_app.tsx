import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout'
import { AuthContextProvider } from '../context/authContext'
import '../styles/globals.css'

const noAuthRequiredPages = ['/login', '/signup', '/']

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

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
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}
export default MyApp

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout'
import { AuthContextProvider } from '../context/authContext'
import { SocketProvider } from '../context/socketContext'
import { ToastProvider } from '../context/toastContext'
import '../styles/globals.css'

const noAuthRequiredPages = ['/login', '/signup', '/']

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthContextProvider>
          {noAuthRequiredPages.includes(router.pathname) ? (
            <>
              <Component {...pageProps} />
            </>
          ) : (
            <SocketProvider>
              <AuthenticatedLayout>
                <Component {...pageProps} />
              </AuthenticatedLayout>
            </SocketProvider>
          )}
        </AuthContextProvider>
      </ToastProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  )
}
export default MyApp

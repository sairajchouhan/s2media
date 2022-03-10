import { RenderOptions, render } from '@testing-library/react'
import React, { ReactElement } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import AuthenticatedLayout from '../components/layouts/AuthenticatedLayout'
import { ToastProvider } from '../context/toastContext'
import { AuthContextProvider } from '../context/authContext'

const createAuthRoutesWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const authRoutesWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthenticatedLayout>{children}</AuthenticatedLayout>
      </ToastProvider>
    </QueryClientProvider>
  )

  return authRoutesWrapper
}

const createNoAuthRoutesWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const noAuthRoutesWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <AuthContextProvider>{children}</AuthContextProvider>
      </ToastProvider>
    </QueryClientProvider>
  )

  return noAuthRoutesWrapper
}

export const authRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: createAuthRoutesWrapper(), ...options })

export const noAuthRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: createNoAuthRoutesWrapper(), ...options })

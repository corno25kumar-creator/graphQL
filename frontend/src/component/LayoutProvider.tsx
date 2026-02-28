'use client'

import { apolloClient } from '@/lib/graphql/client'
import { ApolloProvider } from '@apollo/client'
import { PrimeReactProvider } from 'primereact/api'
import { ToastProvider } from '@/contexts/ToastContext'

type Props = {
  children: React.ReactNode
}

export default function LayoutProvider({ children }: Props) {
  return (
    <div
      className="mx-auto px-4 py-6"
      style={{
        maxWidth: '1200px',
      }}
    >
      <ApolloProvider client={apolloClient}>
        <PrimeReactProvider>
          <ToastProvider>{children}</ToastProvider>
        </PrimeReactProvider>
      </ApolloProvider>
    </div>
  )
}
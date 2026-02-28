import { ApolloClient, HttpLink, InMemoryCache, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename'

const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN

const removeTypenameLink = removeTypenameFromVariables()

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_SERVER_URL + '/graphql',
  headers: {
    authorization: `Bearer ${authToken}`,
  },
})

const cache = new InMemoryCache()

const link = from([removeTypenameLink, errorLink, httpLink])

export const apolloClient = new ApolloClient({
  cache,
  link,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only', // on first load, fetch from network
      nextFetchPolicy: 'cache-and-network', // on subsequent loads, fetch from cache first, then network
    },
  },
})
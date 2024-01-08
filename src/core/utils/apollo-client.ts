import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { useAuthStore } from '@/shared/stores/auth'

const url = import.meta.env.PROD ? location.origin : import.meta.env.VITE_API_URL
const httpLink = createHttpLink({
  uri: `${url}/graphql`,
  fetch: async (uri, options) => {
    if (window.Cypress)
      return fetch(uri, options)

    const { getAccessTokenSilently } = useAuthStore()

    options = {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer ${await getAccessTokenSilently()}`,
      },
    }
    return fetch(uri, options)
  },
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({ link: httpLink, cache })

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const link = createHttpLink({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({ link, cache })

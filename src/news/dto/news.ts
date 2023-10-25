import gql from 'graphql-tag'

export interface News {
  id: string
  title: string
  content: string
  image: string
  publishedAt: string
  __typename: 'NewsObject'
}

export const NEWS = gql`
    fragment News on NewsObject {
      id
      title
      content
      image
      publishedAt
    }
`

import gql from 'graphql-tag'
import type { User } from '@/shared/dto/user'
import { USER } from '@/shared/dto/user'

export interface Message {
  id: string
  text: string
  mine: boolean
  time: string
  sender: User
  __typename: 'MessageObject'
}

export const MESSAGE = gql`
    fragment Message on MessageObject {
      id
      text
      mine
      time
      sender {
        ...User
      }
    }
    ${USER}
`

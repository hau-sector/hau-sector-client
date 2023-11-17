import gql from 'graphql-tag'
import { CONTACT } from '@/chat/dto/contact'
import type { Contact } from '@/chat/dto/contact'

export interface Message {
  id: string
  text: string
  mine: boolean
  time: string
  sender: Contact
  __typename: 'MessageObject'
}

export const MESSAGE = gql`
    fragment Message on MessageObject {
      id
      text
      mine
      time
      sender {
        ...Contact
      }
    }
    ${CONTACT}
`

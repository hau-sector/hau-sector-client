import { useMutation, useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import type { CreateMessage } from '@/chat/dto/create-message'
import { MESSAGE } from '@/chat/dto/message'
import type { Message } from '@/chat/dto/message'

export const useMessagesService = createGlobalState(() => ({
  getMessages: (
    buildingId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { messages: Message[] },
    { buildingId: string | undefined }
  >(gql`
    query GetMessages($buildingId: String!) {
      messages(buildingId: $buildingId) {
        ...Message
      }
    }
    ${MESSAGE}
  `,
  () => ({
    buildingId: toValue(buildingId),
  }),
  () => ({
    enabled: Boolean(toValue(buildingId)),
  })),

  createMessage: () => useMutation<
    { createMessage: Message },
    { payload: CreateMessage; buildingId: string }
  >(gql`
    mutation CreateMessage($payload: CreateMessageInput!, $buildingId: String!) {
      createMessage(payload: $payload, buildingId: $buildingId) {
        ...Message
      }
    }
    ${MESSAGE}
  `),
}))

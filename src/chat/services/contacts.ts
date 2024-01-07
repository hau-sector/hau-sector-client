import { useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import type { User } from '@/shared/dto/user'
import { USER } from '@/shared/dto/user'

export const useContactsService = createGlobalState(() => ({
  getContacts: (
    buildingId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { contacts: User[] },
    { buildingId: string | undefined }
  >(gql`
    query GetContacts($buildingId: String!) {
      contacts(buildingId: $buildingId) {
        ...User
      }
    }
    ${USER}
  `,
  () => ({
    buildingId: toValue(buildingId),
  }),
  () => ({
    enabled: Boolean(toValue(buildingId)),
  })),
}))

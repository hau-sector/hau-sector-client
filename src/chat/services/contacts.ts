import { useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import type { Contact } from '@/chat/dto/contact'
import { CONTACT } from '@/chat/dto/contact'

export const useContactsService = createGlobalState(() => ({
  getContacts: (
    buildingId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { contacts: Contact[] },
    { buildingId: string | undefined }
  >(gql`
    query GetContacts($buildingId: String!) {
      contacts(buildingId: $buildingId) {
        ...Contact
      }
    }
    ${CONTACT}
  `,
  () => ({
    buildingId: toValue(buildingId),
  }),
  () => ({
    enabled: Boolean(toValue(buildingId)),
  })),
}))

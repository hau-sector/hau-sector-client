import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { shallowReadonly } from 'vue'
import { useContactsService } from '@/chat/services/contacts'

import { useFlatsStore } from '@/shared/stores/flats'
import type { User } from '@/shared/dto/user'

export const useContactsStore = createGlobalState(() => {
  const contacts = shallowRef<User[]>([])

  const contactsService = useContactsService()
  const { buildingId } = useFlatsStore()
  const { result } = contactsService.getContacts(buildingId)
  whenever(result, result => contacts.value = result.contacts)

  return {
    contacts: shallowReadonly(contacts),
  }
})

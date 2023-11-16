import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { shallowReadonly } from 'vue'
import { useContactsService } from '@/chat/services/contacts'
import type { Contact } from '@/chat/dto/contact'

import { usePropertiesStore } from '@/shared/stores/properties'

export const useContactsStore = createGlobalState(() => {
  const contacts = shallowRef<Contact[]>([])

  const contactsService = useContactsService()
  const { selectedId } = usePropertiesStore()
  const { result } = contactsService.getContacts(selectedId)
  whenever(result, result => contacts.value = result.contacts)

  return {
    contacts: shallowReadonly(contacts),
  }
})

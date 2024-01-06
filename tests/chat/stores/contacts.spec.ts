import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, ref } from 'vue'
import { useContactsStore } from '@/chat/stores/contacts'

const resultMock = ref()
vi.mock('@/chat/services/contacts', () => ({
  useContactsService: () => ({
    getContacts: () => ({ result: resultMock }),
  }),
}))

vi.mock('@/shared/stores/flats', () => ({
  useFlatsStore: () => ({
    buildingId: ref(''),
  }),
}))

describe('useContactsStore', () => {
  let contactsStore: ReturnType<typeof useContactsStore>

  beforeEach(() => {
    contactsStore = useContactsStore()
  })

  it('should return ref of contacts array', () => {
    expect(contactsStore.contacts).toBeDefined()
    expect(isRef(contactsStore.contacts)).toBeTruthy()
    expect(Array.isArray(contactsStore.contacts.value)).toBeTruthy()
  })

  describe('contacts', () => {
    it('should be empty array', () => {
      expect(contactsStore.contacts.value).toStrictEqual([])
    })

    it('should contain result from service', async () => {
      resultMock.value = { contacts: [{ id: 1 }] }
      await nextTick()

      expect(contactsStore.contacts.value).toStrictEqual([{ id: 1 }])
    })
  })
})

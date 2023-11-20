import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, ref } from 'vue'
import { useMessagesStore } from '@/chat/stores/messages'

const resultMock = ref()
const mutateMock = vi.fn()
vi.mock('@/chat/services/messages', () => ({
  useMessagesService: () => ({
    getMessages: () => ({ result: resultMock }),
    createMessage: () => ({ mutate: mutateMock }),
  }),
}))

vi.mock('@/shared/stores/properties', () => ({
  usePropertiesStore: () => ({
    selectedId: ref(''),
  }),
}))

describe('useMessagesStore', () => {
  let messagesStore: ReturnType<typeof useMessagesStore>

  beforeEach(() => {
    messagesStore = useMessagesStore()
  })

  it('should return ref of messages array', () => {
    expect(messagesStore.messages).toBeDefined()
    expect(isRef(messagesStore.messages)).toBeTruthy()
    expect(Array.isArray(messagesStore.messages.value)).toBeTruthy()
  })

  it('should return create function', () => {
    expect(messagesStore.create).toBeDefined()
    expect(messagesStore.create).toBeTypeOf('function')
  })

  describe('messages', () => {
    it('should be empty array', () => {
      expect(messagesStore.messages.value).toStrictEqual([])
    })

    it('should contain result from service', async () => {
      resultMock.value = { messages: [{ id: 1 }] }
      await nextTick()

      expect(messagesStore.messages.value).toStrictEqual([{ id: 1 }])
    })
  })

  describe('create', () => {
    it('should add new message to array', async () => {
      mutateMock.mockReturnValueOnce({ data: { createMessage: { id: 1 } } })
      await nextTick()

      expect(messagesStore.messages.value.at(-1)).toStrictEqual({ id: 1 })
    })
  })
})

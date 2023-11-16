import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { shallowReadonly } from 'vue'
import type { CreateMessage } from '@/chat/dto/create-message'
import { usePropertiesStore } from '@/shared/stores/properties'
import { useMessagesService } from '@/chat/services/messages'
import type { Message } from '@/chat/dto/message'

export const useMessagesStore = createGlobalState(() => {
  const messages = shallowRef<Message[]>([])

  const messagesService = useMessagesService()
  const { selectedId } = usePropertiesStore()
  const { result } = messagesService.getMessages(selectedId)
  whenever(result, result => messages.value = result.messages)

  const { mutate } = messagesService.createMessage()

  async function create(payload: CreateMessage) {
    if (selectedId.value) {
      const result = await mutate({
        payload,
        buildingId: selectedId.value,
      })

      if (result?.data)
        messages.value = [...messages.value, result.data.createMessage]
    }
  }

  return {
    messages: shallowReadonly(messages),

    create,
  }
})

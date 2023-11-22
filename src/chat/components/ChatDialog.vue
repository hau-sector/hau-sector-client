<script setup lang="ts">
import { shallowRef } from '@vue/reactivity'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { tryOnMounted } from '@vueuse/core'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { nextTick, reactive, watch } from 'vue'
import { useMessagesStore } from '@/chat/stores/messages'
import MessageDialog from '@/chat/components/MessageDialog.vue'

const { messages } = useMessagesStore()

const state = reactive({
  text: '',
})
const rules = {
  text: { required },
}
const $v = useVuelidate(rules, state)

const { create } = useMessagesStore()
async function submit() {
  state.text = state.text.trim()
  const valid = await $v.value.$validate()
  if (valid) {
    await create(state)
    Object.assign(state, { text: '' })
    $v.value.$reset()
  }
}

const listRef = shallowRef<HTMLElement>()
function scrollDown() {
  nextTick(() => {
    if (listRef.value)
      listRef.value.scrollTop = listRef.value.scrollHeight
  })
}
watch(messages, scrollDown)
tryOnMounted(scrollDown)
</script>

<template>
  <div class="flex flex-col gap-1">
    <div ref="listRef" class="flex flex-col flex-1 p-6 gap-4 overflow-auto">
      <MessageDialog v-for="message of messages" :key="message.id" data-test="chat-message-dialog" :message="message" />
    </div>

    <div class="panel flex flex-2 gap-1 justify-between p-2">
      <Textarea
        v-model="$v.text.$model"
        data-test="chat-input-area"
        class="flex-1 border-0"
        auto-resize
        placeholder="Введите сообщение..."
        @keydown.exact.enter.prevent="submit"
      />
      <Button data-test="chat-button" text severity="secondary" class="flex justify-center" :disabled="$v.$invalid" @click="submit">
        <i class="pi bi-arrow-return-right text-3xl" />
      </Button>
    </div>
  </div>
</template>

<style scoped>

</style>

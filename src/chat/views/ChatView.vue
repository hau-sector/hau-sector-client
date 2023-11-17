<script lang="ts" setup>
import ChatDialog from '@/chat/components/ChatDialog.vue'
import ContactsList from '@/chat/components/ContactsList.vue'
</script>

<template>
  <div class="flex gap-6">
    <div class="flex-2 flex flex-col overflow-auto">
      <span class="flex justify-center my-6 text-2xl">Соседи</span>
      <ContactsList :online="true" />
      <ContactsList :online="false" />
    </div>
    <ChatDialog class="flex flex-1" />
  </div>
</template>

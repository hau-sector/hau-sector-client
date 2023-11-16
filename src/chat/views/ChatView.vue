<script lang="ts" setup>
import ChatDialog from '@/chat/components/ChatDialog.vue'
import ContactsList from '@/chat/components/ContactsList.vue'
</script>

<template>
  <div class="flex gap-6">
    <div class="flex-2 flex flex-col gap-6 p-4 overflow-auto">
      <ContactsList :online="true" />
      <ContactsList :online="false" />
    </div>
    <ChatDialog class="flex flex-1" />
  </div>
</template>

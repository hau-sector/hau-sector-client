<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
import Button from 'primevue/button'
import { computed } from 'vue'
import PropertySelect from '@/shared/components/PropertySelect.vue'
import { useUserStore } from '@/shared/stores/user'
import { useAuthStore } from '@/shared/stores/auth'

const { user } = useUserStore()
const name = computed(() => {
  if (!user.value)
    return ''

  const {
    lastName,
    firstName: [f],
    middleName: [m],
  } = user.value
  return `${lastName} ${f}. ${m}.`
})

const { logout } = useAuthStore()
</script>

<template>
  <Toolbar
    data-test="header-component"
    class="panel rounded-t-none border-t-0 py-3"
  >
    <template #start>
      <div v-if="user" class="flex gap-5 items-center">
        <img data-test="header-avatar" :src="user.avatar" alt="avatar" class="w-10 h-10 rounded-lg object-cover object-center">
        <div class="text-lg">
          {{ name }}
        </div>
      </div>
    </template>

    <template #end>
      <div class="flex gap-2">
        <PropertySelect data-test="header-property-select" />

        <Button icon="bi-box-arrow-right" severity="danger" text @click="logout" />
      </div>
    </template>
  </Toolbar>
</template>

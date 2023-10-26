<script setup lang="ts">
import Menu from 'primevue/menu'
import InputSwitch from 'primevue/inputswitch'
import type { MenuItem } from 'primevue/menuitem'
import Toolbar from 'primevue/toolbar'
import type { RouteLocationRaw } from 'vue-router'
import { computed } from 'vue/dist/vue'
import { useSettingsStore } from '@/shared/stores/settings'
import { RouteName } from '@/shared/constants/route-name'
import { useUserStore } from '@/shared/stores/user'
import PropertySelect from '@/shared/components/PropertySelect.vue'

const items: (MenuItem & { route: RouteLocationRaw; color: string })[] = [
  { label: 'Главная', icon: 'pi bi-house', route: { name: RouteName.HOME }, color: 'text-cyan-600' },
  { label: 'Регистрация показаний', icon: 'pi bi-speedometer', route: { name: RouteName.REGISTER }, color: 'text-teal-600' },
  { label: 'Начиcления и платежи', icon: 'pi bi-piggy-bank', route: { name: RouteName.PAYMENTS }, color: 'text-indigo-600' },
  { label: 'Голосования', icon: 'pi bi-check-square', route: { name: RouteName.VOTES }, color: 'text-fuchsia-600' },
  { label: 'Чат', icon: 'pi bi-chat', route: { name: RouteName.CHAT }, color: 'text-emerald-600' },
  { label: 'Заявки на ТО', icon: 'pi bi-exclamation-octagon', route: { name: RouteName.ISSUES }, color: 'text-amber-600' },
  { label: 'Новости', icon: 'pi bi-newspaper', route: { name: RouteName.NEWS }, color: 'text-rose-600' },
]

const { dark } = useSettingsStore()

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
</script>`

<template>
  <Menu
    :model="items"
    :pt="{
      root: { class: 'panel min-w-max py-4 flex flex-col' },
      menu: { class: 'min-w-max' },
      menuitem: { class: 'my-3' },
      content: { class: 'overflow-hidden' },
      end: { class: 'mt-auto' },
    }"
  >
    <template #item="{ item, props }">
      <router-link v-slot="{ href, isActive, navigate }" :to="item.route" custom>
        <a
          :href="href"
          :class="{ 'bg-hover': isActive }"
          class="flex items-center gap-5 px-7 py-3 transition"
          v-bind="props.action"
          @click="navigate"
        >
          <i class="text-xl m-0" :class="[item.color]" v-bind="props.icon" />
          <span class="text-lg whitespace-nowrap transition" :class="{ [item.color]: isActive }" v-bind="props.label">
            {{ item.label }}
          </span>
        </a>
      </router-link>
    </template>

    <template #end>
      <div class="flex gap-5 justify-center">
        <label class="flex gap-3" for="dark-theme-switch">
          <i class="pi bi-lamp text-xl" />
          <span>Темная тема</span></label>
        <InputSwitch v-model="dark" input-id="dark-theme-switch" />
      </div>

      <Toolbar
        class="panel rounded-t-none border-t-0 py-3"
      >
        <template #start>
          <div v-if="user" class="flex gap-5 items-center">
            <img :src="user.avatar" alt="avatar" class="w-10 h-10 rounded-lg object-cover object-center">
            <div class="text-lg">
              {{ name }}
            </div>
          </div>
        </template>

        <template #end>
          <div class="flex gap-5">
            <PropertySelect />

            <Button icon="list" />
          </div>
        </template>
      </Toolbar>
    </template>
  </Menu>
</template>

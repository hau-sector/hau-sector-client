<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import Menu from 'primevue/menu'
import InputSwitch from 'primevue/inputswitch'
import type { MenuItem } from 'primevue/menuitem'
import type { RouteLocationRaw } from 'vue-router'
import { useSettingsStore } from '@/shared/stores/settings'
import { RouteName } from '@/shared/constants/route-name'

const items: (MenuItem & { route: RouteLocationRaw; color: string })[] = [
  { label: 'Главная', icon: 'bi-house', route: { name: RouteName.HOME }, color: 'text-cyan-600' },
  { label: 'Регистрация показаний', icon: 'bi-speedometer', route: { name: RouteName.REGISTER }, color: 'text-teal-600' },
  { label: 'Начиcления и платежи', icon: 'bi-piggy-bank', route: { name: RouteName.PAYMENTS }, color: 'text-indigo-600' },
  { label: 'Голосования', icon: 'bi-check-square', route: { name: RouteName.VOTES }, color: 'text-fuchsia-600' },
  { label: 'Чат', icon: 'bi-chat', route: { name: RouteName.CHAT }, color: 'text-emerald-600' },
  { label: 'Заявки на ТО', icon: 'bi-exclamation-octagon', route: { name: RouteName.ISSUES }, color: 'text-amber-600' },
  { label: 'Новости', icon: 'bi-newspaper', route: { name: RouteName.NEWS }, color: 'text-rose-600' },
]

const { dark } = useSettingsStore()

const breakpoints = useBreakpoints(breakpointsTailwind)
const collapsed = breakpoints.smaller('xl')
</script>`

<template>
  <Menu
    :model="items"
    :pt="{
      root: { class: `panel min-w-max py-4 flex flex-col ${collapsed && 'w-min px-0'}` },
      menu: { class: 'min-w-max' },
      menuitem: { class: 'my-3' },
      content: { class: `overflow-hidden  ${collapsed && 'rounded-none'}` },
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
          <span v-show="!collapsed" class="text-lg whitespace-nowrap transition" :class="{ [item.color]: isActive }" v-bind="props.label">
            {{ item.label }}
          </span>
        </a>
      </router-link>
    </template>

    <template #end>
      <div class="flex gap-5 items-center justify-center" :class="{ 'flex-col gap-3': collapsed }">
        <label class="flex gap-3" for="dark-theme-switch">
          <i class="bi-lamp text-xl" />
          <span v-show="!collapsed">Темная тема</span></label>
        <InputSwitch v-model="dark" input-id="dark-theme-switch" />
      </div>
    </template>
  </Menu>
</template>

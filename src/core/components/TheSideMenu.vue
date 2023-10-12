<script setup lang="ts">
import Menu from 'primevue/menu'
import InputSwitch from 'primevue/inputswitch'
import type { MenuItem } from 'primevue/menuitem'
import type { RouteLocationRaw } from 'vue-router'
import { useSettingsStore } from '@/core/stores/settings'
import { RouteName } from '@/shared/constants/route-name'

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
</script>`

<template>
  <Menu
    :model="items"
    :pt="{
      root: { class: 'panel min-w-max py-4 flex flex-col' },
      menu: { class: 'min-w-max' },
      menuitem: { class: 'my-3' },
      end: { class: 'mt-auto' },
    }"
  >
    <template #item="{ item, props }">
      <router-link v-slot="{ href, isActive, navigate }" :to="item.route" custom>
        <a
          :href="href"
          :class="isActive && 'bg-hover'"
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
    </template>
  </Menu>
</template>

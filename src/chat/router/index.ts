import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from '@/shared/constants/route-name'

export const chatRoute: RouteRecordRaw = {
  path: '/chat',
  name: RouteName.CHAT,
  component: () => import('@/chat/views/ChatView.vue'),
}

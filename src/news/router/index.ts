import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from '@/shared/constants/route-name'

export const newsRoute: RouteRecordRaw = {
  path: '/news',
  name: RouteName.NEWS,
  component: () => import('@/news/views/NewsView.vue'),
}

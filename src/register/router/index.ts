import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from '@/shared/constants/route-name'

export const registerRoute: RouteRecordRaw = {
  path: '/register',
  name: RouteName.REGISTER,
  component: () => import('@/register/views/RegisterView.vue'),
}

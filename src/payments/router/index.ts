import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from '@/shared/constants/route-name'

export const paymentsRoute: RouteRecordRaw = {
  path: '/payments',
  name: RouteName.PAYMENTS,
  component: () => import('@/payments/views/PaymentsView.vue'),
}

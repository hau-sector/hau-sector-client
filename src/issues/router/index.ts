import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from '@/shared/constants/route-name'

export const issuesRoute: RouteRecordRaw = {
  path: '/issues',
  name: RouteName.ISSUES,
  component: () => import('@/issues/views/IssuesView.vue'),
}

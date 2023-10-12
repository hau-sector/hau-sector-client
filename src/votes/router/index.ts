import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from '@/shared/constants/route-name'

export const votesRoute: RouteRecordRaw = {
  path: '/votes',
  name: RouteName.VOTES,
  component: () => import('@/votes/views/VotesView.vue'),
}

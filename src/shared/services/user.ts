import { useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import { USER } from '@/shared/dto/user'
import type { User } from '@/shared/dto/user'

export const useUserService = createGlobalState(() => ({
  getMyUser: () => useQuery<
    { myUser: User }
  >(gql`
      query GetMyUser {
        myUser {
          ...User
        }
      }
      ${USER}
    `,
  ),
}))

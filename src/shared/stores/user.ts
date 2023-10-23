import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { shallowReadonly } from 'vue'
import { useUserService } from '@/shared/services/user'
import type { User } from '@/shared/dto/user'

export const useUserStore = createGlobalState(() => {
  const user = shallowRef< User >()

  const userService = useUserService()
  const { result } = userService.getMyUser()
  whenever(result, result => user.value = result.myUser)

  return {
    user: shallowReadonly(user),
  }
})

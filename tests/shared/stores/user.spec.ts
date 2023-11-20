import { beforeEach, describe, expect, it, vi } from 'vitest'
import { isRef, nextTick, ref } from 'vue'
import { useUserStore } from '@/shared/stores/user'

const resultMock = ref()
vi.mock('@/shared/services/user', () => ({
  useUserService: () => ({
    getMyUser: () => ({ result: resultMock }),
  }),
}))

describe('useUserStore', () => {
  let userStore: ReturnType<typeof useUserStore>

  beforeEach(() => {
    userStore = useUserStore()
  })

  it('should return ref of user object', () => {
    expect(userStore.user).toBeDefined()
    expect(isRef(userStore.user)).toBeTruthy()
  })

  describe('user', () => {
    it('should be empty object', () => {
      expect(userStore.user.value).toBeUndefined()
    })

    it('should contain result from service', async () => {
      resultMock.value = { myUser: { id: 1 } }
      await nextTick()

      expect(userStore.user.value).toStrictEqual({ id: 1 })
    })
  })
})

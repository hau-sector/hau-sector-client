import { createGlobalState } from '@vueuse/core'
import { useAuth0 } from '@auth0/auth0-vue'

export const useAuthStore = createGlobalState(() => useAuth0())

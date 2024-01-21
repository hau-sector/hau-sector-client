import { useAuth0 } from '@auth0/auth0-vue'
import { createGlobalState, whenever } from '@vueuse/core'

export const useAuthStore = createGlobalState(() => {
  const auth = useAuth0()
  if (!window.Cypress)
    whenever(() => auth.error.value, auth.loginWithRedirect)

  return auth
})

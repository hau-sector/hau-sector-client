import { breakpointsTailwind, createGlobalState, useBreakpoints } from '@vueuse/core'
import { ref } from 'vue'

export const useSideMenuStore = createGlobalState(() => {
  const opened = ref(false)

  const { smaller } = useBreakpoints(breakpointsTailwind)
  const hidden = smaller('md')

  return {
    hidden,
    opened,
  }
})

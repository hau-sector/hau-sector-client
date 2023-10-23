import {
  createGlobalState, useLocalStorage,
} from '@vueuse/core'
import { serializer } from '@/shared/utils/serializer'

export const useSettingsStore = createGlobalState(() => {
  const dark = useLocalStorage<boolean>('dark-theme', false, { serializer })

  return {
    dark,
  }
})

import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { shallowReadonly } from 'vue'
import type { CreateIssue } from '@/issues/dto/create-issue'
import type { Issue } from '@/issues/dto/issue'
import { useIssueService } from '@/issues/services/issues'
import { usePropertiesStore } from '@/shared/stores/properties'

export const useIssuesStore = createGlobalState(() => {
  const issues = shallowRef<Issue[]>([])

  const issueService = useIssueService()
  const { selectedId } = usePropertiesStore()
  const { result } = issueService.getIssues(selectedId)
  whenever(result, result => issues.value = result.issues)

  const { mutate } = issueService.createIssue()
  async function create(payload: CreateIssue) {
    if (selectedId.value) {
      const result = await mutate({
        payload,
        buildingId: selectedId.value,
      })

      if (result?.data)
        issues.value = [...issues.value, result.data.issue]
    }
  }

  return {
    issues: shallowReadonly(issues),

    create,
  }
})

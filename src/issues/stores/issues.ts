import { shallowRef } from '@vue/reactivity'
import { createGlobalState, whenever } from '@vueuse/core'
import { shallowReadonly } from 'vue'
import type { CreateIssue } from '@/issues/dto/create-issue'
import type { Issue } from '@/issues/dto/issue'
import { useIssueService } from '@/issues/services/issues'
import { useFlatsStore } from '@/shared/stores/flats'

export const useIssuesStore = createGlobalState(() => {
  const issues = shallowRef<Issue[]>([])

  const issueService = useIssueService()
  const { buildingId } = useFlatsStore()
  const { result } = issueService.getIssues(buildingId)
  whenever(result, result => issues.value = result.issues)

  const { mutate } = issueService.createIssue()
  async function create(payload: CreateIssue) {
    if (buildingId.value) {
      const result = await mutate({
        payload,
        buildingId: buildingId.value,
      })

      if (result?.data)
        issues.value = [result.data.createIssue, ...issues.value]
    }
  }

  return {
    issues: shallowReadonly(issues),

    create,
  }
})

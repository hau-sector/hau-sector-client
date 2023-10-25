import { useMutation, useQuery } from '@vue/apollo-composable'
import { createGlobalState } from '@vueuse/core'
import gql from 'graphql-tag'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import type { CreateIssue } from '@/issues/dto/create-issue'
import { ISSUE } from '@/issues/dto/issue'
import type { Issue } from '@/issues/dto/issue'

export const useIssueService = createGlobalState(() => ({
  getIssues: (
    buildingId: MaybeRefOrGetter<string | undefined>,
  ) => useQuery<
    { issues: Issue[] },
      { buildingId: string | undefined }
  >(gql`
      query GetIssues($buildingId: String!) {
        issues(buildingId: $buildingId) {
          ...Issue
        }
      }
      ${ISSUE}
    `,
  () => ({
    buildingId: toValue(buildingId),
  }),
  () => ({
    enabled: Boolean(toValue(buildingId)),
  })),

  createIssue: () => useMutation<
      { issue: Issue },
      { payload: CreateIssue; buildingId: string }
  >(gql`
      mutation CreateIssue($payload: CreateIssueInput!, $buildingId: String!) {
        createIssue(payload: $payload, buildingId: $buildingId) {
          ...Issue
        }
      }
      ${ISSUE}
    `),
}))

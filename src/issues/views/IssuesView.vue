<script lang="ts" setup>
import { computed } from 'vue'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import IssueCard from '@/issues/components/IssueCard.vue'
import IssueForm from '@/issues/components/IssueForm.vue'
import { IssueStatus } from '@/issues/constants/issue-status'
import type { Issue } from '@/issues/dto/issue'
import { useIssuesStore } from '@/issues/stores/issues'

const { issues } = useIssuesStore()

const titleMap: Record<IssueStatus, string> = {
  [IssueStatus.SENT]: 'Принятые',
  [IssueStatus.PROGRESS]: 'В работе',
  [IssueStatus.DONE]: 'Завершенные',
}

const issuesMap = computed(() =>
  Object.fromEntries(
    Object.keys(titleMap).map(status => [
      status,
      issues.value.filter(issue => issue.status === status),
    ]),
  ) as Record<IssueStatus, Issue[]>,
)
</script>

<template>
  <div class="flex flex-col gap-10">
    <IssueForm class="shrink-0 mx-auto w-[34rem] max-w-full" />
    <div>
      <Accordion :active-index="0">
        <AccordionTab
          v-for="(issues, status) of issuesMap"
          :key="status" :header="titleMap[status]"
          :pt="{
            header: { class: 'text-lg' },
          }"
        >
          <div class="grid grid-cols-1 2xl:grid-cols-3 gap-5 overflow-auto">
            <IssueCard
              v-for="issue of issues"
              :key="issue.id"
              :issue="issue"
              class="h-full"
            />
          </div>
        </AccordionTab>
      </Accordion>
    </div>
  </div>
</template>

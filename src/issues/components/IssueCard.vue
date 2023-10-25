<script setup lang="ts">
import moment from 'moment'
import { computed, toRef } from 'vue'
import { IssueStatus } from '@/issues/constants/issue-status'
import type { Issue } from '@/issues/dto/issue'

const props = defineProps<{
  issue: Issue
}>()

const issue = toRef(props, 'issue')

const date = computed(() => moment(issue.value.createdAt).format('DD MMMM'))

const metas: Record<IssueStatus, { label: string; bgColor: string; textColor: string }> = {
  [IssueStatus.SENT]: { label: 'Принято', bgColor: 'before:from-sky-200', textColor: 'text-sky-500' },
  [IssueStatus.PROGRESS]: { label: 'Обрабатывается', bgColor: 'before:from-amber-200', textColor: 'text-amber-500' },
  [IssueStatus.DONE]: { label: 'Завершено', bgColor: 'before:from-lime-200', textColor: 'text-lime-500' },
}
const meta = computed(() => metas[props.issue.status])
</script>

<template>
  <div
    class="
  panel px-10 py-6 flex flex-col gap-5 overflow-hidden relative
  before:content-[''] before:z-0  before:absolute before:inset-0 before:bg-gradient-to-tr before:via-transparent before:origin-bottom-left before:scale-75
"
    :class="[meta.bgColor]"
  >
    <span class="text-xl font-bold z-10">{{ issue.title }}</span>
    <span class="mb-3 z-10">{{ issue.content }}</span>

    <div class="flex z-10">
      <span class="font-bold drop-shadow-md" :class="[meta.textColor]">{{ meta.label }}</span>

      <span class="ml-auto text-gray-500">{{ date }}</span>
    </div>
  </div>
</template>

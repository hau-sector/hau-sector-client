<script lang="ts" setup>
import IssueCard from '@/issues/components/IssueCard.vue'
import IssueForm from '@/issues/components/IssueForm.vue'
import { useIssuesStore } from '@/issues/stores/issues'

const { issues } = useIssuesStore()
</script>

<template>
  <div class="flex flex-col gap-5">
    <IssueForm class="shrink-0" />

    <div class="grid grid-cols-1 2xl:grid-cols-2 gap-5 overflow-auto">
      <IssueCard v-for="issue of issues" :key="issue.id" :issue="issue" class="h-[min-content]" />
    </div>
  </div>
</template>

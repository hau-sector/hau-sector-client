<script lang="ts" setup>
import IssueCard from '@/issues/components/IssueCard.vue'
import { useIssuesStore } from '@/issues/stores/issues'

const { issues } = useIssuesStore()
</script>

<template>
  <div class="grid grid-cols-1 2xl:grid-cols-2 gap-5">
    <IssueCard v-for="issue of issues" :key="issue.id" :issue="issue" class="h-[min-content]" />
  </div>
</template>

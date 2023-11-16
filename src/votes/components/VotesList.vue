<script setup lang="ts">
import TitledComponent from '@/shared/components/TitledComponent.vue'
import VoteCard from '@/votes/components/VoteCard.vue'
import { useVotesStore } from '@/votes/stores/votes'

const { votes } = useVotesStore()
</script>

<template>
  <TitledComponent title="Голосования" icon="pi bi-bar-chart">
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-5">
      <VoteCard
        v-for="item of votes" :key="item.id" :vote="item" class="shrink-0"
      />
    </div>
  </TitledComponent>
</template>

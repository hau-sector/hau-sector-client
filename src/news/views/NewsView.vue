<script lang="ts" setup>
import NewsCard from '@/news/components/NewsCard.vue'
import { useNewsStore } from '@/news/stores/news'

const { news } = useNewsStore()
</script>

<template>
  <div class="grid grid-cols-1 2xl:grid-cols-2 gap-5">
    <NewsCard v-for="item of news" :key="item.id" :news="item" class="h-[min-content]" />
  </div>
</template>

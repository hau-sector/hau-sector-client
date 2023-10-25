<script setup lang="ts">
import moment from 'moment'
import { computed, toRef } from 'vue'
import type { News } from '@/news/dto/news'

const props = defineProps<{
  news: News
}>()

const news = toRef(props, 'news')

const date = computed(() => moment(news.value.publishedAt).format('DD MMMM'))
</script>

<template>
  <div class="panel p-7 flex gap-10 relative overflow-hidden">
    <img :src="news.image" alt="photo" class="z-0 absolute w-full h-full scale-125 object-cover object-center rounded-theme blur-xl opacity-20 pointer-events-none">

    <div class="w-6/12 z-10 shadow-lg rounded-xl overflow-hidden">
      <img :src="news.image" alt="photo" class="w-full h-full object-cover object-center">
    </div>

    <div class="z-10 w-6/12 pt-5 mr-5 flex flex-col gap-5">
      <span class="text-xl font-bold">{{ news.title }}</span>
      <span class="mb-3">{{ news.content }}</span>

      <span class="ml-auto text-gray-500">{{ date }}</span>
    </div>
  </div>
</template>

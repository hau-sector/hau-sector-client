<script setup lang="ts">
import { shallowRef } from '@vue/reactivity'
import { syncRefs, tryOnMounted } from '@vueuse/core'
import type { ChartData } from 'chart.js'
import moment from 'moment'
import Button from 'primevue/button'
import Chart from 'primevue/chart'
import RadioButton from 'primevue/radiobutton'
import { computed, ref, toRef } from 'vue'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import type { Vote } from '@/votes/dto/vote'
import { VoteStatus } from '@/votes/constants/vote-status'
import { VoteAnswer } from '@/votes/constants/vote-answer'
import { faker } from '@/shared/utils/faker'

const props = defineProps<{
  vote: Vote
}>()
const votes = toRef(props, 'vote')

const answer = shallowRef<VoteAnswer>()
syncRefs(() => props.vote.answer, answer)

const metas: Record<VoteStatus, { label: string; textColor: string; icon: string }> = {
  [VoteStatus.NEW]: { label: 'Опубликовано', textColor: 'text-emerald-500', icon: 'pi bi-eye' },
  [VoteStatus.COMPLETED]: { label: 'Завершено', textColor: 'text-red-500', icon: 'pi bi-check-all' },
}
const meta = computed(() => metas[props.vote.status])

const selectedCategory = ref<VoteAnswer>()
const categories = ref([
  { name: VoteAnswer.AGREE, key: 'AGREE', label: 'За' },
  { name: VoteAnswer.DISAGREE, key: 'DISAGREE', label: 'Против' },
  { name: VoteAnswer.AVOID, key: 'AVOID', label: 'Воздержаться' },
])

const date = computed(() => moment(votes.value.publishedAt).format('DD MMMM'))

const toast = useToast()
function submit() {
  answer.value = selectedCategory.value
  if (props.vote.answer) {
    toast.add({
      severity: 'success',
      summary: 'Спасибо',
      detail: 'Ваш голос учтен!',
      life: 3000,
    })
  }
}

const chartData = shallowRef<ChartData>()
function updateChartData() {
  chartData.value = {
    labels: categories.value.map(item => item.label),
    datasets: [
      {
        label: 'Результаты',
        data: Array.from({ length: 3 }, () => faker.number.int({ min: 0, max: 100 })),
        backgroundColor: ['rgba(185, 206, 128, 0.2)', 'rgba(250, 158, 158, 0.2)', 'rgba(154, 209, 229, 0.2)'],
        borderColor: ['rgb(185, 206, 128)', 'rgb(250, 158, 158)', 'rgb(154, 209, 229)'],
        borderWidth: 1,
      },
    ],
  }
}
tryOnMounted(updateChartData)
</script>

<template>
  <div class="panel px-10 py-6 flex flex-col gap-5">
    <div class="flex justify-between">
      <div class="flex gap-4" :class="[meta.textColor]">
        <i :class="[meta.icon]" />
        <span>{{ meta.label }}</span>
      </div>
      <div class="flex justify-end mt-auto">
        {{ date }}
      </div>
    </div>

    <div class="text-lg">
      {{ vote.title }}
    </div>
    <div> {{ vote.content }} </div>

    <div v-if="!answer" class="flex justify-around items-center">
      <div v-for="category in categories" :key="category.key" class="flex gap-2">
        <RadioButton v-model="selectedCategory" :input-id="category.key" :value="category.key" />
        <label :for="category.key">{{ category.label }}</label>
      </div>
      <Toast />
      <Button :disabled="!selectedCategory" label="Проголосовать" severity="success" @click="submit()" />
    </div>

    <div v-else>
      <Chart type="bar" :data="chartData" :options="{ responsive: true, maintainAspectRatio: false }" />
    </div>
  </div>
</template>

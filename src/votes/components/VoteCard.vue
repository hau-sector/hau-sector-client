<script setup lang="ts">
import type { ChartData } from 'chart.js'
import moment from 'moment'
import Button from 'primevue/button'
import Chart from 'primevue/chart'
import RadioButton from 'primevue/radiobutton'
import { computed, ref, toRef } from 'vue'
import { useToast } from 'primevue/usetoast'
import type { Vote } from '@/votes/dto/vote'
import { VoteStatus } from '@/votes/constants/vote-status'
import { VoteAnswer } from '@/votes/constants/vote-answer'
import { useVotesStore } from '@/votes/stores/votes'
import TransitionFade from '@/shared/components/TransitionFade.vue'

const props = defineProps<{
  vote: Vote
}>()
const vote = toRef(props, 'vote')

const metas: Record<VoteStatus, { label: string; textColor: string; icon: string }> = {
  [VoteStatus.NEW]: { label: 'Опубликовано', textColor: 'text-emerald-500', icon: 'bi-eye' },
  [VoteStatus.COMPLETED]: { label: 'Завершено', textColor: 'text-red-500', icon: 'bi-check-all' },
}
const meta = computed(() => metas[props.vote.status])

const selectedAnswer = ref<VoteAnswer>()
const answerLabelMapping: Record<VoteAnswer, string> = {
  [VoteAnswer.AGREE]: 'За',
  [VoteAnswer.DISAGREE]: 'Против',
  [VoteAnswer.AVOID]: 'Воздержаться',
}

const date = computed(() => moment(vote.value.publishedAt).format('DD MMMM'))

const { setAnswer } = useVotesStore()
const toast = useToast()
async function submit() {
  if (selectedAnswer.value)
    await setAnswer(props.vote.id, selectedAnswer.value)

  if (props.vote.answer) {
    toast.add({
      severity: 'success',
      summary: 'Спасибо',
      detail: 'Ваш голос учтен!',
      life: 3000,
    })
  }
}

const chartData = computed<ChartData>(() => ({
  labels: Object.values(answerLabelMapping),
  datasets: [
    {
      label: 'Результаты',
      data: [props.vote.result.agree, props.vote.result.disagree, props.vote.result.avoid],
      backgroundColor: ['rgba(185, 206, 128, 0.2)', 'rgba(250, 158, 158, 0.2)', 'rgba(154, 209, 229, 0.2)'],
      borderColor: ['rgb(185, 206, 128)', 'rgb(250, 158, 158)', 'rgb(154, 209, 229)'],
      borderWidth: 1,
    },
  ],
}))
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

    <TransitionFade>
      <div
        v-if="!props.vote.answer"
        class="flex justify-around items-center mt-auto"
      >
        <div
          v-for="(label, answer) in answerLabelMapping" :key="answer"
          class="flex gap-2"
        >
          <RadioButton
            v-model="selectedAnswer"
            data-test="vote-card-radiobutton"
            :value="answer"
          />
          <label>{{ label }}</label>
        </div>
        <Button
          data-test="vote-card-button" :disabled="!selectedAnswer"
          label="Проголосовать" severity="success" @click="submit()"
        />
      </div>

      <div v-else>
        <Chart
          type="bar" data-test="vote-card-chart" :data="chartData"
          :options="{ responsive: true, maintainAspectRatio: false }"
        />
      </div>
    </TransitionFade>
  </div>
</template>

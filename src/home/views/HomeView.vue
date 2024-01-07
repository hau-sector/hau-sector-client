<script lang="ts" setup>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { tryOnMounted } from '@vueuse/core'
import Button from 'primevue/button'
import { computed, reactive } from 'vue'
import InputText from 'primevue/inputtext'
import { useSettingsStore } from '@/shared/stores/settings'
import { useMessagesStore } from '@/chat/stores/messages'
import { usePaymentDatasStore } from '@/payments/stores/payment-datas'
import { useNewsStore } from '@/news/stores/news'
import { IssueStatus } from '@/issues/constants/issue-status'
import { useIssuesStore } from '@/issues/stores/issues'
import MeterRegistrator from '@/register/components/MeterRegistrator.vue'
import { MeterType } from '@/register/constants/meter-type'
import { RouteName } from '@/shared/constants/route-name'
import { VoteStatus } from '@/votes/constants/vote-status'
import { useVotesStore } from '@/votes/stores/votes'

const { votes } = useVotesStore()
const actualVotes = computed(() => votes.value.filter(vote => vote.status === VoteStatus.NEW))

const { issues } = useIssuesStore()
const actualIssues = computed(() => issues.value.filter(issue => issue.status === IssueStatus.SENT))

const meterRegistratorMetas: { type: MeterType; shadow: string }[] = [
  { type: MeterType.ENERGY, shadow: 'hover:shadow-amber-100' },
  { type: MeterType.WATER, shadow: 'hover:shadow-sky-100' },
  { type: MeterType.GAS, shadow: 'hover:shadow-red-100' },
]

const { news } = useNewsStore()
const actualNews = computed(() => news.value.slice(0, 5))

const { unpaidPaymentDatas } = usePaymentDatasStore()
const accountAmount = computed(() => {
  if (!unpaidPaymentDatas.value)
    return 0
  return unpaidPaymentDatas.value.reduce((a, data) => a + data.value, 0)
})
const credit = computed(() => accountAmount.value < 0)

const { messages } = useMessagesStore()
const lastMessages = computed(() => messages.value.slice(-2))

const state = reactive({ text: '' })
const rules = { text: { required } }
let $v = useVuelidate(rules, state)
tryOnMounted(() => $v = useVuelidate(rules, state))

const { create } = useMessagesStore()
async function submit() {
  state.text = state.text.trim()
  const valid = await $v.value.$validate()
  if (valid) {
    await create(state)
    Object.assign(state, { text: '' })
    $v.value.$reset()
  }
}

const { dark } = useSettingsStore()
</script>

<template>
  <div class="flex gap-2 xl:gap-10 flex-col">
    <div class="flex flex-col xl:flex-row gap-2 xl:gap-10">
      <div class="flex flex-col flex-1 gap-2 xl:gap-10 xl:min-w-[68rem]">
        <div class="flex flex-col xl:flex-row gap-2 xl:gap-10">
          <div class="flex flex-col gap-2 flex-1">
            <span class="text-2xl my-3">
              Баланс
            </span>
            <router-link
              data-test="home-balance"
              :to="{ name: RouteName.PAYMENTS }"
              class="panel flex flex-col flex-1 gap-6 p-6 text-inherit no-underline transition cursor-pointer hover:shadow-lg
              overflow-hidden relative before:content-[''] before:z-0 before:absolute before:inset-0 before:bg-gradient-to-tr before:via-transparent
              before:origin-bottom-left before:scale-75 before:opacity-30"
              :class="[
                credit ? 'before:from-emerald-500' : 'before:from-red-500',
                dark ? 'hover:shadow-black' : 'hover:shadow-red-100',
              ]"
            >
              <div
                :class=" credit ? 'text-emerald-600' : 'text-red-400'"
                class="text-2xl"
              >
                {{ !credit ? 'задолженность' : 'переплата' }}:
              </div>
              <div
                :class="credit ? 'text-emerald-600' : 'text-red-400'"
                class="text-4xl"
              >
                - {{ accountAmount }}.00 руб
              </div>
              <div class="flex gap-2 justify-end items-center">
                <span class="hover:underline">Перейти к оплате</span>
                <i class="bi-arrow-right" />
              </div>
            </router-link>
          </div>

          <div class="flex flex-1 flex-col gap-2">
            <span class="text-2xl my-3">Чат</span>
            <div
              class="panel flex flex-col flex-1 p-3 justify-between gap-6 transition hover:shadow-lg"
              :class="dark ? 'hover:shadow-black' : 'hover:shadow-sky-100'"
            >
              <router-link
                data-test="home-chat"
                :to="{ name: RouteName.CHAT }"
                class="flex flex-col flex-1 gap-6 text-inherit no-underline"
              >
                <div class="flex justify-between">
                  <span>Последние сообщения:</span>
                  <div class="flex gap-2 items-center">
                    <span class="hover:underline">Перейти в чат</span>
                    <i class="bi-arrow-right" />
                  </div>
                </div>

                <div class="flex flex-col gap-2">
                  <div
                    v-for="message of lastMessages"
                    :key="message.id" data-test="home-chat-messages"
                    class="flex items-end gap-2"
                  >
                    <img v-if="!message.mine" :src="message.sender.avatar" class="rounded-full w-5">
                    <span
                      class="py-1 px-2 rounded-xl max-w-sm"
                      :class="[
                        message.mine ? 'ml-auto bg-emerald-100' : 'mr-auto bg-slate-100',
                        dark ? 'text-black' : '',
                      ]"
                    >{{ message.text }}</span>
                  </div>
                </div>
              </router-link>

              <div class="flex justify-between gap-2">
                <InputText
                  v-model="$v.text.$model"
                  data-test="home-chat-input"
                  class="flex flex-1 border-0 h-10 p-0 px-2 justify-center"
                  placeholder="Введите ответ..."
                  @keydown.exact.enter.prevent="submit"
                />
                <Button
                  data-test="home-chat-button"
                  text
                  severity="secondary"
                  :disabled="$v.$invalid"
                  @click="submit"
                >
                  <i class="bi-arrow-return-right" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2 flex-2">
          <span class="text-2xl my-3">
            Показания счетчиков
          </span>
          <div class="flex gap-5 flex-col xl:flex-row">
            <router-link
              v-for="meta of meterRegistratorMetas"
              :key="meta.type" data-test="home-meter"
              :to="{ name: RouteName.REGISTER }"
              class="flex flex-1 text-inherit no-underline transition cursor-pointer hover:shadow-lg"
              :class="dark ? 'hover:shadow-black' : [meta.shadow]"
            >
              <MeterRegistrator class="flex-1" :type="meta.type" :mini="true" />
            </router-link>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2 xl:flex-shrink xl:flex-1">
        <span class="text-2xl my-3">
          Актуальные голосования
        </span>
        <router-link
          v-for="vote of actualVotes"
          :key="vote.id" data-test="home-votes"
          :to="{ name: RouteName.VOTES }"
          class="panel flex flex-col gap-2 px-6 py-4 text-inherit  no-underline transition cursor-pointer hover:shadow-lg"
          :class="dark ? 'hover:shadow-black' : 'hover:shadow-indigo-100'"
        >
          <span> {{ vote.title }}</span>
        </router-link>
      </div>
    </div>

    <div class="flex flex-col xl:flex-row gap-2 xl:gap-10">
      <div class="flex flex-col flex-1 gap-2  xl:min-w-[68rem]">
        <span class="text-2xl my-3">
          Новости
        </span>
        <router-link
          v-for="item of actualNews"
          :key="item.id"
          data-test="home-news"
          :to="{ name: RouteName.NEWS }"
          class="panel flex items-center h-16 gap-6 text-inherit no-underline transition cursor-pointer hover:shadow-lg"
          :class="dark ? 'hover:shadow-black' : 'hover:shadow-indigo-100'"
        >
          <img class="w-24 h-full border-r-4" :src="item.image">
          <span>{{ item.title }}</span>
        </router-link>
      </div>

      <div class="flex flex-col xl:flex-shrink gap-2 xl:flex-1">
        <span class="text-2xl my-3">
          Актуальные заявки
        </span>
        <router-link
          v-for="issue of actualIssues"
          :key="issue.id" data-test="home-issues"
          :to="{ name: RouteName.ISSUES }"
          class="panel flex flex-col flex-auto gap-2 px-6 py-4 justify-center text-inherit no-underline transition cursor-pointer hover:shadow-lg"
          :class="dark ? 'hover:shadow-black' : 'hover:shadow-indigo-100'"
        >
          <span> {{ issue.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

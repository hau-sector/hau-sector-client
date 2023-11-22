<script setup lang="ts">
import Button from 'primevue/button'
import { computed, ref } from 'vue'
import PaymentDialog from '@/payments/components/PaymentDialog.vue'
import { usePaymentDatasStore } from '@/payments/stores/payment-datas'
import TitledComponent from '@/shared/components/TitledComponent.vue'

const { unpaidPaymentDatas } = usePaymentDatasStore()
const accountAmount = computed(() => {
  if (!unpaidPaymentDatas.value)
    return 0
  return unpaidPaymentDatas.value.reduce((a, data) => a + data.value, 0)
})

const credit = computed(() => accountAmount.value < 0)

const buttonOptions = computed(() => {
  if (!credit.value)
    return { severity: 'danger', label: 'Оплатить' }
  return { severity: 'info', label: 'Вывести' }
})

const totalUnpaid = computed(() => unpaidPaymentDatas.value?.length)

const visible = ref<Boolean>(false)
</script>

<template>
  <TitledComponent title="Баланс" icon="pi bi-piggy-bank">
    <div
      class="
    panel flex flex-col gap-16 pt-10 pb-5 px-16 overflow-hidden relative
    before:content-[''] before:z-0 before:absolute before:inset-0 before:bg-gradient-to-tr before:via-transparent
    before:origin-bottom-left before:scale-75 before:opacity-30"
      :class="credit ? 'before:from-emerald-500' : 'before:from-red-500'"
    >
      <div class="flex flex-col gap-5" :class="credit ? 'text-emerald-600' : 'text-red-400'">
        <div class="m-0 text-2xl">
          {{ credit ? 'переплата' : 'задолженность' }}
        </div>
        <div data-test="balance-info" class="text-6xl m-0">
          - {{ accountAmount }}.00 руб
        </div>
      </div>

      <div class="flex gap-5 justify-between">
        <div v-if="!credit">
          Всего не оплачено счетов: <span class="text-2xl">{{ totalUnpaid }}</span>
        </div>
        <Button
          data-test="balance-full-amount-button"
          :severity="buttonOptions.severity"
          :label="buttonOptions.label"
          class="w-56"
          @click="visible = true"
        />

        <PaymentDialog v-model:visible="visible" :value="accountAmount" />
      </div>
    </div>
  </TitledComponent>
</template>

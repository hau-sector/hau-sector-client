<script setup lang="ts">
import { shallowRef } from '@vue/reactivity'
import { ignorableWatch, syncRefs, whenever } from '@vueuse/core/index'
import moment from 'moment'
import Calendar from 'primevue/calendar'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import SelectButton from 'primevue/selectbutton'
import { ref } from 'vue'
import { usePaymentDatasStore } from '@/payments/stores/payment-datas'
import { capCase } from '@/shared/utils/case'
import TitledComponent from '@/shared/components/TitledComponent.vue'
import type { PaymentData } from '@/payments/dto/payment-data'

interface PeriodOption {
  label: string
  value: number
}
const periodOptions: PeriodOption[] = [
  { label: '6 мес', value: 6 },
  { label: '9 мес', value: 9 },
  { label: '12 мес', value: 12 },
]
const period = shallowRef<PeriodOption>(periodOptions[0])

const range = ref()
const { ignoreUpdates: ignoreRangeUpdates } = ignorableWatch(range, () => period.value = periodOptions[0])
whenever(
  period,
  ({ value }) => ignoreRangeUpdates(() =>
    range.value = [moment().subtract(value, 'months').toDate(), new Date()],
  ),
  { immediate: true },
)

const { paymentDatas, loading, start, end } = usePaymentDatasStore()
syncRefs(() => range.value[0], start)
syncRefs(() => range.value[1], end)

function extractMonth(value: string) {
  return capCase(moment(value).format('MMMM'))
}
</script>

<template>
  <TitledComponent title="История" icon="bi-calendar3">
    <div class="flex-1 flex flex-col gap-5 overflow-auto">
      <div class="flex gap-10 justify-center">
        <SelectButton
          v-model="period"
          :pt="{
            button: { 'data-test': 'payment-history-select-button' },
          }"
          data-test="payment-history-select" :options="periodOptions"
          option-label="label"
        />
        <Calendar
          v-model="range"
          data-test="payment-history-calendar" :manual-input="true" class="w-64"
          placeholder="дд.мм.гг - дд.мм.гг" selection-mode="range"
          show-icon date-format="dd.mm.yy"
        />
      </div>
      <DataTable
        data-test="payment-history-table"
        scrollable
        scroll-height="flex"
        sort-field="paidAt"
        :loading="loading"
        :sort-order="-1"
        class="panel"
        :value="paymentDatas"
      >
        <Column :sortable="true" header="Дата" field="paidAt">
          <template #body="{ data }: {data: PaymentData}">
            {{ moment(data.paidAt).format('DD.MM.YYYY') }}
          </template>
        </Column>

        <Column header="Период" field="value">
          <template #body="{ data }: {data: PaymentData}">
            {{ extractMonth(data.paidAt) }}
          </template>
        </Column>

        <Column header="Начислено" field="value">
          <template #body="{ data }: {data: PaymentData}">
            {{ data.value }} руб
          </template>
        </Column>

        <Column header="Оплачено" field="paid">
          <template #body="{ data }: {data: PaymentData}">
            <span :class="data.paid ? '' : 'text-red-500'">
              {{ data.paid ? 'Оплачено' : 'К оплате' }}
            </span>
          </template>
        </Column>

        <Column header=".PDF">
          <template #body>
            <div class="hover:cursor-pointer">
              <i class="bi-download" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </TitledComponent>
</template>

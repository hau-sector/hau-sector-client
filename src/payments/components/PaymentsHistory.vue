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

function extractMonth(value: Date) {
  return capCase(moment(value).format('MMMM'))
}
</script>

<template>
  <TitledComponent title="История" icon="pi bi-calendar3">
    <div class="flex flex-col gap-5">
      <div class="flex gap-10 justify-center">
        <SelectButton
          v-model="period" :options="periodOptions"
          option-label="label"
        />
        <Calendar
          v-model="range" :manual-input="true" class="w-64"
          placeholder="дд.мм.гг - дд.мм.гг" selection-mode="range"
          show-icon date-format="dd.mm.yy"
        />
      </div>
      <DataTable
        scrollable
        scroll-height="flex"
        sort-field="paidAt"
        :loading="loading"
        :sort-order="-1"
        class="panel h-[40rem] xl:h-[calc(100vh-19rem)]"
        :value="paymentDatas"
      >
        <Column sortable header="Дата" field="paidAt">
          <template #body="{ data }">
            {{ moment(data.paidAt).format('DD.MM.YYYY') }}
          </template>
        </Column>

        <Column header="Период" field="value">
          <template #body="{ data }">
            {{ extractMonth(data.paidAt) }}
          </template>
        </Column>

        <Column header="Начислено" field="value">
          <template #body="{ data }">
            {{ data.value }}.00 руб
          </template>
        </Column>

        <Column header="Оплачено" field="paid">
          <template #body="{ data }">
            <span :class="data.paid ? '' : 'text-red-500'">
              {{ data.paid ? 'Оплачено' : 'К оплате' }}
            </span>
          </template>
        </Column>

        <Column header=".PDF">
          <template #body>
            <div class="hover:cursor-pointer">
              <i class="pi bi-download" />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </TitledComponent>
</template>

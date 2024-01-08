<script setup lang="ts">
import { shallowRef } from '@vue/reactivity'
import moment from 'moment'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useAttrs } from 'vue'
import type { PaymentData } from '@/payments/dto/payment-data'
import PaymentDialog from '@/payments/components/PaymentDialog.vue'
import { capCase } from '@/shared/utils/case'
import { usePaymentDatasStore } from '@/payments/stores/payment-datas'
import TitledComponent from '@/shared/components/TitledComponent.vue'

const attrs = useAttrs()

const { unpaidPaymentDatas } = usePaymentDatasStore()

function extractMonth(value: string) {
  return capCase(moment(value).format('MMMM'))
}

const dialogData = shallowRef<PaymentData>()
</script>

<template>
  <PaymentDialog v-if="dialogData" :visible="!!dialogData" :value="dialogData.value" @update:visible="!$event && (dialogData = undefined)" />

  <TitledComponent v-bind="attrs" title="Счета" icon="bi-basket">
    <DataTable
      scrollable
      scroll-height="flex"
      :value="unpaidPaymentDatas"
      class="panel flex-1"
    >
      <Column field="value" header="Сумма">
        <template #body="{ data }: {data: PaymentData}">
          {{ data.value }} руб
        </template>
      </Column>
      <Column field="paidAt" header="Период">
        <template #body="{ data }: {data: PaymentData}">
          {{ extractMonth(data.paidAt) }}
        </template>
      </Column>

      <Column field="" header="Оплатить">
        <template #body="{ data }">
          <Button severity="success" label="Оплатить" @click="dialogData = data" />
        </template>
      </Column>

      <Column field="" header="Счет в .PDF">
        <template #body>
          <div class="hover:cursor-pointer flex gap-5">
            <i class="bi-download" />
            <span>Скачать</span>
          </div>
        </template>
      </Column>
    </DataTable>
  </TitledComponent>
</template>

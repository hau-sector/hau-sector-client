<script setup lang="ts">
import { shallowRef } from '@vue/reactivity'
import moment from 'moment'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import type { PaymentData } from '@/payments/dto/payment-data'
import PaymentDialog from '@/payments/components/PaymentDialog.vue'
import { capCase } from '@/shared/utils/case'
import { usePaymentDatasStore } from '@/payments/stores/payment-datas'
import TitledComponent from '@/shared/components/TitledComponent.vue'

const { unpaidPaymentDatas } = usePaymentDatasStore()

function extractMonth(value: Date) {
  return capCase(moment(value).format('MMMM'))
}

const dialogData = shallowRef<PaymentData>()
</script>

<template>
  <PaymentDialog v-if="dialogData" :visible="!!dialogData" :value="dialogData.value" @update:visible="!$event && (dialogData = undefined)" />

  <TitledComponent title="Счета" icon="pi bi-basket">
    <DataTable
      scrollable
      scroll-height="flex"
      :value="unpaidPaymentDatas"
      class="panel h-[19rem]"
    >
      <Column field="value" header="Сумма">
        <template #body="{ data }">
          {{ data.value }}.00 руб
        </template>
      </Column>
      <Column field="paidAt" header="Период">
        <template #body="{ data }">
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
            <i class="pi bi-download" />
            <span>Скачать</span>
          </div>
        </template>
      </Column>
    </DataTable>
  </TitledComponent>
</template>

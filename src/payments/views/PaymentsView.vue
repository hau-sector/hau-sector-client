<script lang="ts" setup>
import Balance from '@/payments/components/Balance.vue'
import PaymentsHistory from '@/payments/components/PaymentsHistory.vue'
import Receipt from '@/payments/components/Receipt.vue'
</script>

<template>
  <div class="flex flex-col gap-10 xl:flex-row">
    <div class="flex-1 flex flex-col gap-4">
      <Balance />
      <Receipt class="flex-1" />
    </div>
    <PaymentsHistory class="flex-1" />
  </div>
</template>

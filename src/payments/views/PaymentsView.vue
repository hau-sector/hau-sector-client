<script lang="ts" setup>
import Balance from '@/payments/components/Balance.vue'
import PaymentsHistory from '@/payments/components/PaymentsHistory.vue'
import Receipt from '@/payments/components/Receipt.vue'
</script>

<template>
  <div class="flex flex-col gap-10 xl:flex-row">
    <div class="flex flex-col flex-1 gap-4">
      <Balance class="" />
      <Receipt class="" />
    </div>
    <PaymentsHistory class="flex-1" />
  </div>
</template>

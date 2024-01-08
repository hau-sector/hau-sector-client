<script lang="ts" setup>
import MeterForm from '@/register/components/MeterForm.vue'
import MeterHistory from '@/register/components/MeterHistory.vue'
</script>

<template>
  <div data-test="register-view" class="flex flex-col gap-10 xl:flex-row">
    <MeterForm class="flex-1 shrink-0" />
    <MeterHistory class="flex-1 shrink-0" />
  </div>
</template>

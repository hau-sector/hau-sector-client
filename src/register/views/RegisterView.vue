<script lang="ts" setup>
import MeterForm from '@/register/components/MeterForm.vue'
import MeterHistory from '@/register/components/MeterHistory.vue'
</script>

<template>
  <div data-test="register-view" class="flex flex-col gap-10 xl:flex-row">
    <MeterForm class="xl:flex-1" />
    <MeterHistory class="xl:flex-auto" />
  </div>
</template>

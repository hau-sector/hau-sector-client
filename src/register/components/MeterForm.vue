<script setup lang="ts">
import MeterRegistrator from '@/register/components/MeterRegistrator.vue'
import { MeterType } from '@/register/constants/meter-type'
import TitledComponent from '@/shared/components/TitledComponent.vue'
</script>

<template>
  <TitledComponent title="Ввод показаний" icon="pi bi-pen">
    <div class="flex flex-col gap-5">
      <MeterRegistrator :type="MeterType.ENERGY" />
      <MeterRegistrator :type="MeterType.WATER" />
      <MeterRegistrator :type="MeterType.GAS" />
    </div>
  </TitledComponent>
</template>

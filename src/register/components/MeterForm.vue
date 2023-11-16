<script setup lang="ts">
import MeterRegistrator from '@/register/components/MeterRegistrator.vue'
import { MeterType } from '@/register/constants/meter-type'
import TitledComponent from '@/shared/components/TitledComponent.vue'

const types: MeterType[] = [MeterType.ENERGY, MeterType.WATER, MeterType.GAS]
</script>

<template>
  <TitledComponent title="Ввод показаний" icon="pi bi-pen">
    <div class="flex flex-col gap-5">
      <MeterRegistrator v-for="type of types" :key="type" :type="type" />
    </div>
  </TitledComponent>
</template>

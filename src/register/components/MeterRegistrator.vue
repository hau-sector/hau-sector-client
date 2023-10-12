<script setup lang="ts">
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core'
import { computed, ref } from 'vue'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { MeterType } from '@/register/constants/meter-type'

const props = defineProps<{
  type: MeterType
}>()

const metas: Record<MeterType, { label: string; icon: string; color: string }> = {
  [MeterType.ENERGY]: { label: 'Электричество', icon: 'pi bi-lightning', color: 'before:bg-amber-400' },
  [MeterType.WATER]: { label: 'Вода', icon: 'pi bi-droplet', color: 'before:bg-sky-400' },
  [MeterType.GAS]: { label: 'Газ', icon: 'pi bi-fire', color: 'before:bg-red-400' },
}

const meta = computed(() => metas[props.type])

const hidden = ref<Boolean>(true)
tryOnMounted(() => setTimeout(() => hidden.value = false, 10))
tryOnUnmounted(() => hidden.value = true)
</script>

<template>
  <div class="panel flex">
    <div
      class="w-40 pr-3 flex flex-col items-center justify-center gap-2 overflow-hidden relative
      before:content-[''] before:z-0 before:absolute before:-inset-10
      before:-translate-x-10 before:rounded-full before:transition before:duration-500 before:origin-left"
      :class="[meta.color, hidden && 'before:scale-0']"
    >
      <i
        class="text-3xl z-10 text-card drop-shadow-md transition duration-300 delay-200"
        :class="[meta.icon, hidden && 'opacity-0 -translate-x-3']"
      />
      <span
        class="text-lg z-10 text-card drop-shadow-md transition duration-300 delay-200"
        :class="hidden && 'opacity-0 -translate-x-3'"
      >
        {{ meta.label }}
      </span>
    </div>

    <div class="px-10 py-7 flex flex-col flex-1 gap-5 justify-center">
      <div class="flex gap-5">
        <span class="p-float-label flex-1">
          <InputNumber
            id="number-input" class="w-full" :min-fraction-digits="2"
            :max-fraction-digits="5"
          />
          <label for="number-input">Введите показание</label>
        </span>
        <Button severity="success" raised label="Отправить" icon="pi bi-floppy" />
      </div>
      <span>3 дня до конца периода внесения</span>
    </div>
  </div>
</template>

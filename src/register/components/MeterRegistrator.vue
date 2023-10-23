<script setup lang="ts">
import { syncRefs, tryOnMounted, tryOnUnmounted } from '@vueuse/core'
import moment from 'moment'
import { computed, ref } from 'vue'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import { DayLimit } from '@/register/constants/day-limit'
import { useRegistratorStore } from '@/register/stores/registrator'
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

const coverHidden = ref<Boolean>(true)
tryOnMounted(() => setTimeout(() => coverHidden.value = false, 10))
tryOnUnmounted(() => coverHidden.value = true)

const { currentData, sendData, editData } = useRegistratorStore()

const current = computed(() => currentData.value[props.type])
const currentValue = computed(() => current.value?.value)
const value = ref<number>()
syncRefs(currentValue, value)

const today = moment().date()

function parseDay(amount: number): string {
  if (amount % 10 === 1)
    return `${amount} день`
  else if (amount % 10 <= 4)
    return `${amount} дня`
  else
    return `${amount} дней`
}
const label = computed(() => {
  if (current.value)
    return 'Показания переданы'
  else if (today < DayLimit.INPUT)
    return `Осталось ${parseDay(DayLimit.INPUT - today)} до конца периода`
  else
    return 'Период передачи закрыт'
})

const labelColor = computed(() => {
  if (current.value)
    return 'text-green-500'
  else if (DayLimit.INPUT - today <= 2)
    return 'text-red-500'
  else if (DayLimit.INPUT - today <= 5)
    return 'text-amber-500'
  else
    return undefined
})

const buttonDisabled = computed(() =>
  !value.value
  || (!!current.value && value.value === currentValue.value)
  || today >= DayLimit.INPUT,
)
const buttonSeverity = computed(() => {
  if (current.value)
    return 'info'
  else if (today < DayLimit.INPUT)
    return 'success'
  else
    return 'danger'
})

function submit() {
  if (value.value) {
    if (current.value) {
      if (value.value !== currentValue.value)
        editData(props.type, value.value)
    }
    else {
      sendData(props.type, value.value)
    }
  }
}
</script>

<template>
  <div class="panel flex">
    <div
      class="w-40 pr-3 flex flex-col items-center justify-center gap-2 overflow-hidden relative
      before:content-[''] before:z-0 before:absolute before:-inset-10
      before:-translate-x-10 before:rounded-full before:transition before:duration-500 before:origin-left"
      :class="[meta.color, coverHidden && 'before:scale-0']"
    >
      <i
        class="text-3xl z-10 text-card drop-shadow-md transition duration-300 delay-200"
        :class="[meta.icon, coverHidden && 'opacity-0 -translate-x-3']"
      />
      <span
        class="text-lg z-10 text-card drop-shadow-md transition duration-300 delay-200"
        :class="coverHidden && 'opacity-0 -translate-x-3'"
      >
        {{ meta.label }}
      </span>
    </div>

    <div class="px-10 py-7 flex flex-col flex-1 gap-5 justify-center">
      <div class="flex gap-5">
        <span class="p-float-label flex-1">
          <InputNumber
            id="number-input"
            v-model="value"
            class="w-full"
            :min-fraction-digits="2"
            :max-fraction-digits="3"
            @keyup.enter="submit"
            @input="value = $event.value"
          />
          <label for="number-input">Показание</label>
        </span>
        <Button
          :severity="buttonSeverity"
          raised
          :label="current ? 'Изменить' : 'Отправить'"
          :icon="current ? 'bi-pencil' : 'bi-floppy'"
          :disabled="buttonDisabled"
          @click="submit"
        />
      </div>
      <span :class="[labelColor]">{{ label }}</span>
    </div>
  </div>
</template>

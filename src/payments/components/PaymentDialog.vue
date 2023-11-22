<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  visible: boolean
  value: number
}>()

const emits = defineEmits<{
  (e: 'update:visible', payload: boolean): void
}>()

const visible = useVModel(props, 'visible', emits)

const agreement = ref<Boolean>(false)

const toast = useToast()
function showToast() {
  toast.add({ severity: 'success', summary: 'Оплата', detail: 'Оплата прошла успешно', life: 3000 })
}
function submit() {
  showToast()
  agreement.value = false
  visible.value = false
}
</script>

<template>
  <Toast data-test="balance-payment-toast" />
  <Dialog
    v-model:visible="visible"
    modal
    :style="{ width: '40rem' }"
  >
    <template #header>
      <div class="flex flex-1 text-xl">
        Оплата по счету
      </div>
    </template>

    <div class="flex flex-col gap-10">
      <Button data-test="balance-payment-sber" outlined severity="secondary" class="flex flex-1 gap-2 justify-center" @click="agreement = true">
        <img class="w-4" src="@/payments/assets/sber.jpg?url">
        <span class="text-lg">SberPay</span>
      </Button>
      <Dialog v-model:visible="agreement" modal :style="{ width: '20rem' }">
        <template #header>
          <span />
        </template>
        <div class="flex flex-col gap-4">
          <span>Вы будете перенаправлены на страницу оплаты.</span>
          <span>Продолжить?</span>
          <div class="flex gap-2 justify-end">
            <Button outlined data-test="balance-payment-yes" label="да" @click="submit" />
            <Button outlined data-test="balance-payment-no" label="нет" @click="agreement = false" />
          </div>
        </div>
      </Dialog>

      <div
        class="
            flex flex-1 justify-center items-center gap-2
            before:content-[''] before:inline-block before:flex-1 before:h-px before:bg-slate-500
            after:content-[''] after:inline-block after:flex-1 after:h-px after:bg-slate-500"
      >
        или оплатите картой
      </div>

      <div class="flex flex-col gap-2 p-6">
        <label for="email">Email</label>
        <InputText id="email" />
        <span>Данные карты</span>
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <InputText
              id="number"
              autocomplete="cc-number"
              class="flex flex-1"
              placeholder="Номер карты"
            />
            <InputText
              class="flex-2"
              placeholder="MM/YY"
              autocomplete="cc-exp-year"
            />
          </div>
          <div class="flex gap-2 justify-end items-center">
            <span>Последние цифры<br> на обороте карты</span>
            <InputText placeholder="CVV" />
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Button
          data-test="balance-payment-card"
          outlined class="flex flex-1 text-lg" severity="success"
          :label="`Оплатить ${props.value}.00 руб`" autofocus
          @click="agreement = true"
        />
        <div class="flex justify-end">
          <Button plain text label="Отмена" @click="visible = false" />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>

</style>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core/dist/index'
import { required } from '@vuelidate/validators'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { reactive } from 'vue'
import { useIssuesStore } from '@/issues/stores/issues'

const state = reactive({
  title: '',
  content: '',
})
const rules = {
  title: { required },
  content: { required },
}
const $v = useVuelidate(rules, state)

const { create } = useIssuesStore()
async function submit() {
  const valid = await $v.value.$validate()
  if (valid) {
    await create(state)
    Object.assign(state, { title: '', content: '' })
    $v.value.$reset()
  }
}
</script>

<template>
  <div class="panel p-3 flex flex-col gap-3">
    <span class="p-float-label mt-5">
      <InputText
        v-model="$v.title.$model"
        class="w-full"
        :class="{ 'p-invalid': $v.title.$dirty && $v.title.$invalid }"
      />
      <label>Проблема</label>
    </span>

    <span class="p-float-label mt-5">
      <Textarea
        v-model="$v.content.$model"
        class="w-full resize-y"
        :class="{ 'p-invalid': $v.content.$dirty && $v.content.$invalid }"
      />
      <label>Описание</label>
    </span>

    <Button severity="success" :disabled="$v.$invalid" icon="bi-send" label="Отправить" @click="submit" />
  </div>
</template>

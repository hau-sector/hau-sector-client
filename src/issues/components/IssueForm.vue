<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { reactive } from 'vue'
import TitledComponent from '@/shared/components/TitledComponent.vue'
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
    <TitledComponent data-test="issue-form" mini title="Новая заявка" icon="bi-building-add">
      <span class="p-float-label mt-5">
        <InputText
          v-model="$v.title.$model"
          data-test="issue-form-input-header"
          class="w-full"
          :class="{ 'p-invalid': $v.title.$dirty && $v.title.$invalid }"
        />
        <label>Заголовок</label>
      </span>

      <span class="p-float-label mt-5">
        <Textarea
          v-model="$v.content.$model"
          data-test="issue-form-text"
          auto-resize
          class="w-full resize-y"
          :class="{ 'p-invalid': $v.content.$dirty && $v.content.$invalid }"
        />
        <label>Описание</label>
      </span>

      <Button data-test="issue-form-button" severity="success" class="mx-auto flex flex-row-reverse gap-2" :disabled="$v.$invalid" icon="bi-send" label="Отправить" @click="submit" />
    </TitledComponent>
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from '@vue/reactivity'
import { ignorableWatch, syncRefs, whenever } from '@vueuse/core'
import moment from 'moment'
import Calendar from 'primevue/calendar'
import TabMenu from 'primevue/tabmenu'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import Chart from 'primevue/chart'
import type { MenuItem } from 'primevue/menuitem'
import SelectButton from 'primevue/selectbutton'
import { computed, ref } from 'vue'
import { capCase } from '../../shared/utils/case'
import { useMeterDatasStore } from '@/register/stores/meter-datas'
import TitledComponent from '@/shared/components/TitledComponent.vue'
import { MeterType } from '@/register/constants/meter-type'

interface PeriodOption {
  label: string
  value: number
}
const periodOptions: PeriodOption[] = [
  { label: '6 мес', value: 6 },
  { label: '9 мес', value: 9 },
  { label: '12 мес', value: 12 },
]
const period = shallowRef<PeriodOption>(periodOptions[0])

const range = ref()
const { ignoreUpdates: ignoreRangeUpdates } = ignorableWatch(range, () => period.value = undefined)
whenever(
  period,
  ({ value }) => ignoreRangeUpdates(() =>
    range.value = [moment().subtract(value, 'months').toDate(), new Date()],
  ),
  { immediate: true },
)

const items: (MenuItem & { type: MeterType; color: string; border: string })[] = [
  { label: 'Электричество', icon: 'pi bi-lightning', type: MeterType.ENERGY, color: 'text-yellow-500', border: 'border-amber-500' },
  { label: 'Вода', icon: 'pi bi-droplet', type: MeterType.WATER, color: 'text-blue-500', border: 'border-sky-500' },
  { label: 'Газ', icon: 'pi bi-fire', type: MeterType.GAS, color: 'text-red-500', border: 'border-red-500' },
]
const active = ref(0)
const activeType = computed(() => items[active.value]?.type)
const activeLabel = computed(() => items[active.value]?.label)
const activeColor = computed(() => items[active.value]?.color)

const { meterDatas, start, end, type } = useMeterDatasStore()
syncRefs(activeType, type)
syncRefs(() => range.value[0], start)
syncRefs(() => range.value[1], end)

function extractMonth(value: Date) {
  return capCase(moment(value).format('MMMM'))
}

const chartData = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement)
  const color = documentStyle.getPropertyValue(activeColor.value?.replace('text', '-'))

  return ({
    labels: meterDatas.value.map(data => extractMonth(data.entered_at)),
    datasets: [
      {
        label: 'График потребления',
        borderColor: color,
        data: meterDatas.value.map((data, index, array) => index ? (data.value - array[index - 1].value) : 0),
        tension: 0.4,
        fill: false,
      },
    ],
  })
})
</script>

<template>
  <TitledComponent title="История" icon="pi bi-calendar3">
    <div class="flex flex-col gap-5">
      <div class="flex gap-10 justify-center">
        <SelectButton v-model="period" :options="periodOptions" option-label="label" />
        <Calendar
          v-model="range" :manual-input="true" class="w-64"
          placeholder="дд.мм.гг - дд.мм.гг" selection-mode="range"
          show-icon date-format="dd.mm.yy"
        />
      </div>

      <DataTable
        scrollable
        scroll-height="flex"
        sort-field="entered_at"
        :sort-order="-1"
        class="panel h-[40rem] xl:h-[calc(100vh-19rem)]"
        :pt="{
          header: { class: 'p-0 border-none' },
          footer: { class: 'p-0 border-none' },
        }"
        :value="meterDatas"
      >
        <template #header>
          <TabMenu
            v-model:activeIndex="active"
            :pt="{
              menu: { class: 'flex justify-center' },
            }"
            :model="items"
          >
            <template #item="{ item, props }">
              <div
                class="flex justify-center items-center gap-5 w-52 py-3 cursor-pointer transition"
                :class="item.type === activeType && item.border"
                v-bind="props.action"
              >
                <i class="text-xl m-0" :class="item.color" v-bind="props.icon" />
                <span v-bind="props.label" class="transition" :class="item.type === activeType && item.color">{{ item.label }}</span>
              </div>
            </template>
          </TabMenu>
          <div />
        </template>

        <Column sortable header="Дата" field="entered_at">
          <template #body="{ data }">
            {{ moment(data.entered_at).format('DD.MM.YYYY') }}
          </template>
        </Column>
        <Column header="Показание" field="value" />
        <Column header="Период" field="value">
          <template #body="{ data }">
            {{ extractMonth(data.entered_at) }}
          </template>
        </Column>

        <template #footer>
          <Chart
            class="bg-card p-5 pt-10 h-56"
            type="line"
            :data="chartData"
            :options="{ responsive: true, maintainAspectRatio: false }"
          />
        </template>
      </DataTable>
    </div>
  </TitledComponent>
</template>

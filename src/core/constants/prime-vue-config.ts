import type { usePrimeVue } from 'primevue/config'

type PrimeVueConfiguration = ReturnType<typeof usePrimeVue>['config']

export const primeVueConfig: PrimeVueConfiguration = {
  ripple: true,
  ptOptions: {
    mergeSections: true,
    mergeProps: true,
  },
  locale: {
    fileSizeTypes: ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'],
    firstDayOfWeek: 0,
    dateFormat: 'yy.mm.dd',
    monthNames: Array.from({ length: 12 }).map((_, i) =>
      new Date(0, i).toLocaleString('ru-RU', { month: 'long' }),
    ),
    monthNamesShort: Array.from({ length: 12 }).map((_, i) =>
      new Date(0, i).toLocaleString('ru-RU', { month: 'short' }),
    ),
    dayNames: Array.from({ length: 7 }).map((_, i) =>
      new Date(0, 0, 1 + i).toLocaleString('ru-RU', { weekday: 'long' }),
    ),
    dayNamesShort: Array.from({ length: 7 }).map((_, i) =>
      new Date(0, 0, 1 + i).toLocaleString('ru-RU', { weekday: 'short' }),
    ),
    dayNamesMin: Array.from({ length: 7 }).map((_, i) =>
      new Date(0, 0, 1 + i).toLocaleString('ru-RU', { weekday: 'short' }),
    ),
  },
  pt: {
    datatable: {
      header: { class: 'p-0 border-none' },
      footer: { class: 'p-0 border-none' },
      loadingOverlay: { class: 'bg-transparent backdrop-blur' },
    },
  },
}

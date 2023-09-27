import type { usePrimeVue } from 'primevue/config'

type PrimeVueConfiguration = ReturnType<typeof usePrimeVue>['config']

export const primeVueConfig: PrimeVueConfiguration = {
  ripple: true,
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
}

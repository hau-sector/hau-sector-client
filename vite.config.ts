import path from 'node:path'
import vitePluginMsw from '@iodigital/vite-plugin-msw'
import Vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'
import SvgLoader from 'vite-svg-loader'
import { meterDatasMock } from '@/register/mocks/meter-datas'

export default defineConfig({
  base: './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  test: {
    environment: 'jsdom',
    coverage: {
      all: true,
      include: [
        'src/**/components/*.vue',
        'src/**/views/*.vue',
        'src/**/hooks/*.ts',
        'src/**/services/*.ts',
        'src/**/filters/*.ts',
        'src/**/guards/*.ts',
        'src/**/utils/*.ts',
      ],
      reportsDirectory: 'coverage',
    },
  },

  plugins: [
    Vue(),
    VitePWA({ registerType: 'autoUpdate' }),
    SvgLoader(),
    vitePluginMsw({
      handlers: [
        ...meterDatasMock,
      ],
    }),
  ],
})

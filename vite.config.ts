import path from 'node:path'
import Vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import SvgLoader from 'vite-svg-loader'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  base: './',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  test: {
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
    coverage: {
      all: true,
      include: [
        // 'src/**/components/*.vue',
        // 'src/**/views/*.vue',
        // 'src/**/hooks/*.ts',
        // 'src/**/services/*.ts',
        // 'src/**/filters/*.ts',
        // 'src/**/guards/*.ts',
        'src/**/stores/*.ts',
        'src/**/constants/*.ts',
        'src/**/utils/*.ts',
      ],
      reportsDirectory: 'coverage',
    },
  },

  plugins: [
    Vue(),
    VitePWA({ registerType: 'autoUpdate' }),
    SvgLoader(),
  ],
})

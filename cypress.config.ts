import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: '9ey8iy',
  e2e: {
    baseUrl: 'http://127.0.0.1:8080',
    defaultCommandTimeout: 10000,
  },
})

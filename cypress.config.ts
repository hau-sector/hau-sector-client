import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'HAU-Sector',
  e2e: {
    baseUrl: 'http://localhost:8099',
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
  },
})

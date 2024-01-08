import type { Commands } from './commands'

declare global {
  namespace Cypress {
    interface Chainable extends Commands {}
  }
}

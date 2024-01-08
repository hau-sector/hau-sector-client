import './commands'
import { startMock } from '../../mocks'

Cypress.on('test:before:run:async', async () => startMock('http://localhost:8099'))

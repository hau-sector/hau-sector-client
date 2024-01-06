import { setupWorker } from 'msw'
import { meterDatasMock } from './meter-datas'
import { paymentDatasMock } from './payment-datas'
import { buildingsMock } from './buildings'
import { userMock } from './user'
import { newsMock } from './news'
import { votesMock } from './votes'
import { issuesMock } from './issues'
import { contactsMock } from './contacts'
import { messagesMock } from './messages'

export async function startMock(location: string) {
  const worker = setupWorker(
    ...meterDatasMock,
    ...paymentDatasMock,
    ...buildingsMock,
    ...userMock,
    ...newsMock,
    ...votesMock,
    ...issuesMock,
    ...contactsMock,
    ...messagesMock,
  )
  await worker.start({ serviceWorker: { url: `${location}/mockServiceWorker.js` }, onUnhandledRequest: 'bypass' })
}

import moment from 'moment/moment'
import { graphql } from 'msw'
import { faker } from '@/shared/utils/faker'
import type { PaymentData } from '@/payments/dto/payment-data'

const server = graphql.link(`${import.meta.env.VITE_API_URL}/graphql`)

export const paymentDatasMock = [
  server.query<
    { paymentDatas: PaymentData[] },
    { paid?: boolean; start?: Date; end?: Date; buildingId: string }
  >('GetPaymentDatas', (req, res, ctx) => {
    const { start, end } = req.variables

    const paymentDatas: PaymentData[] = Array.from(
      { length: moment(end).diff(start, 'months') },
      (_, i) => ({
        id: faker.database.mongodbObjectId(),
        value: faker.number.int({ min: 0, max: 10000 }),
        paid: faker.datatype.boolean(),
        paidAt: moment(start).add(i, 'months').toISOString(),
        userId: faker.database.mongodbObjectId(),
        __typename: 'PaymentDataObject',
      }),
    )

    return res(ctx.data({ paymentDatas }), ctx.delay('real'))
  }),

  server.query<
    { paymentDatas: PaymentData[] },
    { paid?: boolean; start?: Date; end?: Date; buildingId: string }
  >('GetUnpaidPaymentDatas', (req, res, ctx) => {
    const { paid } = req.variables

    const paymentDatas: PaymentData[] = Array.from(
      { length: faker.number.int({ min: 0, max: 10 }) },
      (_, i) => ({
        id: faker.database.mongodbObjectId(),
        value: faker.number.int({ min: 0, max: 10000 }),
        paid: paid ?? false,
        paidAt: faker.date.past().toISOString(),
        userId: faker.database.mongodbObjectId(),
        __typename: 'PaymentDataObject',
      }),
    )

    return res(ctx.data({ paymentDatas }), ctx.delay('real'))
  }),
]

import { faker } from '@faker-js/faker'
import moment from 'moment/moment'
import { graphql } from 'msw'

const server = graphql.link(`${import.meta.env.API_URL}/graphql`)

export const meterDatasMock = [
  server.query('GetMeterDatas', (req, res, ctx) => {
    const { type, start, end } = req.variables

    const meterDatas = Array.from(
      { length: moment(end).diff(start, 'months') },
      (_, i) => ({
        id: faker.string.uuid(),
        value: 10_000 + i * 220 + faker.number.float({
          max: 100,
          precision: 0.001,
        }),
        accepted: true,
        enteredAt: moment(start).add(i, 'months').toDate(),
        acceptedAt: moment(start).add(i, 'months').toDate(),
        userId: 'uuu',
        type,
      }),
    )

    return res(ctx.data({ meterDatas }))
  }),
]

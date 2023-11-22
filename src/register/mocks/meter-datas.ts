import moment from 'moment/moment'
import { graphql } from 'msw'
import { faker } from '@/shared/utils/faker'
import type { UpdateMeterData } from '@/register/dto/update-meter-data'
import type { CreateMeterData } from '@/register/dto/create-meter-data'
import type { MeterData } from '@/register/dto/meter-data'
import type { MeterType } from '@/register/constants/meter-type'

const server = graphql.link(`${import.meta.env.VITE_API_URL}/graphql`)

export const meterDatasMock = [
  server.query<
    { meterDatas: MeterData[] },
    { type: MeterType; start: Date; end: Date; buildingId: string }
  >('GetMeterDatas', (req, res, ctx) => {
    const { type, start, end } = req.variables

    const meterDatas: MeterData[] = Array.from(
      { length: moment(end).diff(start, 'months') },
      (_, i) => ({
        id: faker.database.mongodbObjectId(),
        value: 10_000 + i * 220 + faker.number.float({ max: 100, precision: 0.001 }),
        accepted: true,
        enteredAt: moment(start).add(i, 'months').toISOString(),
        acceptedAt: moment(start).add(i, 'months').toISOString(),
        updatedAt: faker.helpers.maybe(() => new Date().toISOString()),
        userId: faker.database.mongodbObjectId(),
        type,
        __typename: 'MeterDataObject',
      }),
    )

    return res(ctx.data({ meterDatas }))
  }),
  server.query<
    { currentMeterData: MeterData | undefined },
    { type: MeterType; buildingId: string }
  >('GetCurrentMeterData', (req, res, ctx) => {
    const { type } = req.variables

    const currentMeterData: MeterData | undefined = faker.helpers.maybe(() => ({
      id: faker.database.mongodbObjectId(),
      value: 10_000 + faker.number.float({ max: 1000, precision: 0.001 }),
      accepted: true,
      enteredAt: new Date().toISOString(),
      acceptedAt: new Date().toISOString(),
      updatedAt: faker.helpers.maybe(() => new Date().toISOString()),
      userId: faker.database.mongodbObjectId(),
      type,
      __typename: 'MeterDataObject',
    }))

    return res(ctx.data({ currentMeterData: undefined }))
  }),
  server.mutation<
    { createCurrentMeterData: MeterData },
    { payload: CreateMeterData; buildingId: string }
  >('CreateCurrentMeterData', (req, res, ctx) => {
    const { payload } = req.variables

    const createCurrentMeterData: MeterData = {
      ...payload,
      id: faker.database.mongodbObjectId(),
      accepted: true,
      enteredAt: new Date().toISOString(),
      acceptedAt: new Date().toISOString(),
      userId: faker.database.mongodbObjectId(),
      __typename: 'MeterDataObject',
    }

    return res(ctx.data({ createCurrentMeterData }))
  }),
  server.mutation<
    { updateCurrentMeterData: MeterData },
    { payload: UpdateMeterData; buildingId: string }
  >('UpdateCurrentMeterData', (req, res, ctx) => {
    const { payload } = req.variables

    const updateCurrentMeterData: MeterData = {
      ...payload,
      id: faker.database.mongodbObjectId(),
      accepted: true,
      enteredAt: new Date().toISOString(),
      acceptedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: faker.database.mongodbObjectId(),
      __typename: 'MeterDataObject',
    }

    return res(ctx.data({ updateCurrentMeterData }))
  }),
]

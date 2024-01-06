import { graphql } from 'msw'
import { faker } from '@/shared/utils/faker'
import type { Flat } from '@/shared/dto/flat'

const server = graphql.link('http://127.0.0.1:5000/graphql')

export const buildingsMock = [
  server.query<
    { myFlats: Flat[] }
  >('GetMyFlats', (req, res, ctx) => {
    const myFlats: Flat[] = Array.from(
      { length: 3 },
      () => ({
        id: faker.database.mongodbObjectId(),
        flat: faker.number.int({ min: 1, max: 100 }),
        building: {
          id: faker.database.mongodbObjectId(),
          street: faker.location.streetName(),
          house: faker.number.int({ min: 1, max: 100 }).toString(),
          __typename: 'BuildingObject',
        },
        __typename: 'FlatObject',
      }),
    )

    return res(ctx.data({ myFlats }))
  }),
]

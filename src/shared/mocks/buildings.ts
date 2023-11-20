import { graphql } from 'msw'
import type { Property } from '@/shared/dto/property'
import { faker } from '@/shared/utils/faker'

const server = graphql.link(`${import.meta.env.VITE_API_URL}/graphql`)

export const buildingsMock = [
  server.query<
    { myBuildings: Property[] }
  >('GetMyProperties', (req, res, ctx) => {
    const myBuildings: Property[] = Array.from(
      { length: 3 },
      () => ({
        id: faker.database.mongodbObjectId(),
        flat: faker.number.int({ min: 1, max: 100 }),
        building: {
          street: faker.location.streetName(),
          house: faker.number.int({ min: 1, max: 100 }).toString(),
          __typename: 'BuildingObject',
        },
        __typename: 'FlatObject',
      }),
    )

    return res(ctx.data({ myBuildings }))
  }),
]

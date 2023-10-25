import { graphql } from 'msw'
import type { News } from '@/news/dto/news'
import { faker } from '@/shared/utils/faker'

const server = graphql.link(`${import.meta.env.VITE_API_URL}/graphql`)

export const newsMock = [
  server.query<
        { news: News[] },
        { buildingId: string }
    >('GetNews', (req, res, ctx) => {
      const news: News[] = Array.from(
        { length: 100 },
        (_, i) => ({
          id: faker.database.mongodbObjectId(),
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          image: faker.image.urlLoremFlickr({ category: 'nature' }),
          publishedAt: faker.date.recent({ days: 7 }).toISOString(),
          __typename: 'NewsObject',
        }),
      )

      return res(ctx.data({ news }), ctx.delay('real'))
    }),
]

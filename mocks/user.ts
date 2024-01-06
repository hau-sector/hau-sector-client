import { graphql } from 'msw'
import { faker } from '@/shared/utils/faker'
import type { User } from '@/shared/dto/user'

const server = graphql.link('http://127.0.0.1:5000/graphql')

export const userMock = [
  server.query<
    { myUser: User }
  >('GetMyUser', (req, res, ctx) => {
    const sex = faker.person.sexType()

    const myUser: User = {
      id: faker.database.mongodbObjectId(),
      firstName: faker.person.firstName(sex),
      lastName: faker.person.lastName(sex),
      middleName: faker.person.middleName(sex),
      avatar: faker.image.avatar(),
      __typename: 'UserObject',
    }

    return res(ctx.data({ myUser }))
  }),
]

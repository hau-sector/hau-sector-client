import { graphql } from 'msw'
import type { Contact } from '@/chat/dto/contact'
import { faker } from '@/shared/utils/faker'

const server = graphql.link('http://127.0.0.1:5000/graphql')

export const contactsMock = [
  server.query<
    { contacts: Contact[] },
    { buildingId: string }
  >('GetContacts', (req, res, ctx) => {
    const sex = faker.person.sexType()

    const contacts: Contact[] = Array.from({ length: 20 }, () => ({
      id: faker.database.mongodbObjectId(),
      name: faker.person.firstName(sex),
      surname: faker.person.lastName(sex),
      avatar: faker.image.avatar(),
      online: faker.datatype.boolean(),
      flat: faker.number.int({ min: 1, max: 100 }),
      __typename: 'ContactObject',
    }))

    return res(ctx.data({ contacts }))
  }),
]

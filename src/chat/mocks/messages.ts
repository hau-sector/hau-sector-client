import { graphql } from 'msw'
import type { CreateMessage } from '@/chat/dto/create-message'
import type { Contact } from '@/chat/dto/contact'
import type { Message } from '@/chat/dto/message'
import { faker } from '@/shared/utils/faker'

const server = graphql.link(`${import.meta.env.VITE_API_URL}/graphql`)

export const messagesMock = [
  server.query<
    { messages: Message[] },
    { buildingId: string }
  >('GetMessages', (req, res, ctx) => {
    const sex = faker.person.sexType()

    const senders: Contact[] = Array.from({ length: 20 }, () => ({
      id: faker.database.mongodbObjectId(),
      name: faker.person.firstName(sex),
      surname: faker.person.lastName(sex),
      avatar: faker.image.avatar(),
      online: faker.datatype.boolean(),
      flat: faker.number.int({ min: 1, max: 100 }),
      __typename: 'ContactObject',
    }))

    const messages: Message[] = ([
      {
        id: '1',
        text: 'Привет, как дела?',
      },
      {
        id: '2',
        text: 'Привет! Все отлично, спасибо!',
      },
      {
        id: '3',
        text: 'Когда будет собрание жильцов?',
      },
      {
        id: '4',
        text: 'Пока не назначено. Обсудим на следующей неделе.',
      },
      {
        id: '5',
        text: 'Привет, есть ли у кого-нибудь молоко?',

      },
      {
        id: '6',
        text: 'Да, у меня есть. Заходите вечером.',
      },
      {
        id: '7',
        text: 'Кто сегодня дежурит по подъезду?',

      },
      {
        id: '8',
        text: 'Это моя неделя. Если что-то случится, звоните мне.',

      },
      {
        id: '9',
        text: 'Где можно приобрести ключ от спортзала?',

      },
      {
        id: '10',
        text: 'Ключ можно получить у меня. Зайдите вечером.',

      },
      {
        id: '11',
        text: 'Всем привет! Кто хочет поиграть в настольные игры в выходные?',

      },
      {
        id: '12',
        text: 'Я в игре! Какие у нас варианты?',

      },
      {
        id: '13',
        text: 'Я предлагаю играть в Монополию. У кого есть это игра?',

      },
      {
        id: '14',
        text: 'У меня есть. Могу принести в выходные.',

      },
      {
        id: '15',
        text: 'Привет! Как прошел ремонт у в квартире на 3 этаже?',

      },
      {
        id: '16',
        text: 'Ремонт закончен! Все довольны результатом.',

      },
      {
        id: '17',
        text: 'Подскажите, где можно заказать вкусные суши?',

      },
      {
        id: '18',
        text: 'Я заказываю суши в ресторане "Сакура". Всем рекомендую!',

      },
      {
        id: '19',
        text: 'У кого-то есть детский велосипед? Мой сын хочет покататься.',

      },
      {
        id: '20',
        text: 'У меня есть. Могу дать на прокат. Приходите вечером.',
      },
    ]).map(item => ({
      ...item,
      mine: faker.datatype.boolean({ probability: 0.2 }),
      sender: faker.helpers.arrayElement(senders),
      time: faker.date.recent({ days: 30 }).toISOString(),
      __typename: 'MessageObject',
    }))

    return res(ctx.data({ messages }), ctx.delay('real'))
  }),
  server.mutation<
    { createMessage: Message },
    { payload: CreateMessage; buildingId: string }
  >('CreateMessage', (req, res, ctx) => {
    const { payload } = req.variables

    const sex = faker.person.sexType()
    const sender: Contact = {
      id: faker.database.mongodbObjectId(),
      name: faker.person.firstName(sex),
      surname: faker.person.lastName(sex),
      avatar: faker.image.avatar(),
      online: faker.datatype.boolean(),
      flat: faker.number.int({ min: 1, max: 100 }),
      __typename: 'ContactObject',
    }

    const createMessage: Message = {
      ...payload,
      id: faker.database.mongodbObjectId(),
      mine: true,
      time: new Date().toISOString(),
      sender,
      __typename: 'MessageObject',
    }

    return res(ctx.data({ createMessage }), ctx.delay('real'))
  }),
]

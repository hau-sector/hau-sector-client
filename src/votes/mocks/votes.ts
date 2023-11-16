import { graphql } from 'msw'
import { VoteAnswer } from '@/votes/constants/vote-answer'
import { VoteStatus } from '@/votes/constants/vote-status'
import type { Vote } from '@/votes/dto/vote'

const server = graphql.link(`${import.meta.env.VITE_API_URL}/graphql`)

export const votesMock = [
  server.query<
    { votes: Vote[] },
    { buildingId: string }
  >('GetVotes', (req, res, ctx) => {
    const votes: Vote[] = [
      {
        id: '1',
        title: 'Распределение бюджета на благоустройство',
        content: 'Планируется распределить бюджет на благоустройство территории. Обсудите, на какие проекты стоит потратить средства.',
        status: VoteStatus.NEW,
        publishedAt: '2023-09-05T10:00:00Z',
        answer: undefined,
      },
      {
        id: '2',
        title: 'Установка бесплатного Wi-Fi в общественных зонах',
        content: 'Рассмотрите предложения по установке бесплатного Wi-Fi в общественных зонах комплекса. Проголосуйте за наилучший вариант провайдера.',
        status: VoteStatus.NEW,
        publishedAt: '2023-09-15T15:30:00Z',
        answer: undefined,
      },
      {
        id: '3',
        title: 'Организация мастер-классов для жителей',
        content: 'Предлагается организовать серию мастер-классов для жителей комплекса. Поделитесь своими идеями и предложениями по темам мастер-классов.',
        status: VoteStatus.NEW,
        publishedAt: '2023-09-25T18:00:00Z',
        answer: undefined,
      },
      {
        id: '4',
        title: 'Планирование ландшафтного дизайна',
        content: 'Обсудите предложения по ландшафтному дизайну территории жилого комплекса. Проголосуйте за наиболее подходящие растения и оформление.',
        status: VoteStatus.NEW,
        publishedAt: '2023-10-10T09:00:00Z',
        answer: undefined,
      },
      {
        id: '5',
        title: 'Установка новых скамеек в парке',
        content: 'Рассмотрите варианты установки новых скамеек в парке. Проголосуйте за дизайн и материалы, которые вы считаете наиболее удобными.',
        status: VoteStatus.NEW,
        publishedAt: '2023-10-20T14:30:00Z',
        answer: undefined,
      },
      {
        id: '6',
        title: 'Организация выставки художественных работ',
        content: 'Предлагается организовать выставку художественных работ жителей комплекса. Поддержите идею и предложите свои работы для выставки.',
        status: VoteStatus.NEW,
        publishedAt: '2023-10-30T17:00:00Z',
        answer: VoteAnswer.AVOID,
      },
      {
        id: '7',
        title: 'Проведение спортивного турнира',
        content: 'Обсудите предложение о проведении спортивного турнира в комплексе. Поддержите идею и предложите виды спорта, которые вам интересны.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-11-05T10:00:00Z',
        answer: VoteAnswer.AGREE,
      },
      {
        id: '8',
        title: 'Организация новогоднего праздника',
        content: 'Планируется организовать новогодний праздник для детей и взрослых. Поддержите идею и предложите свои идеи по программе мероприятия.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-11-15T15:30:00Z',
        answer: VoteAnswer.DISAGREE,
      },
      {
        id: '9',
        title: 'Предложение по улучшению системы мусоропровода',
        content: 'Обсудите предложения по улучшению системы мусоропровода в комплексе. Поддержите идеи, которые помогут оптимизировать процесс вывоза мусора.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-11-25T18:00:00Z',
        answer: VoteAnswer.AVOID,
      },
      {
        id: '10',
        title: 'Обновление системы видеонаблюдения',
        content: 'Решено обновить систему видеонаблюдения на территории комплекса. Предложите идеи по новым камерам и местам их установки.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-01-05T10:00:00Z',
        answer: VoteAnswer.AGREE,
      },
      {
        id: '11',
        title: 'Проведение капитального ремонта кровли',
        content: 'Принято решение провести капитальный ремонт кровли всех домов в комплексе. Утвердите план работ и бюджет на ремонтные работы.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-01-15T15:30:00Z',
        answer: VoteAnswer.DISAGREE,
      },
      {
        id: '12',
        title: 'Замена старого оборудования в фитнес-зале',
        content: 'Принято решение заменить старое оборудование в фитнес-зале на новое. Поддержите предложенные модели оборудования и цены на них.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-01-25T18:00:00Z',
        answer: VoteAnswer.AVOID,
      },
      {
        id: '13',
        title: 'Проведение ремонта детской комнаты в доме №2',
        content: 'Утвержден план ремонта детской комнаты в доме №2. Участвуйте в выборе дизайна и игрушек для обновленной комнаты.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-02-05T10:00:00Z',
        answer: VoteAnswer.AGREE,
      },
      {
        id: '14',
        title: 'Организация тематических вечеринок для жителей',
        content: 'Планируется организовать серию тематических вечеринок для жителей комплекса. Поддержите идеи по темам и развлечениям на вечеринках.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-02-15T15:30:00Z',
        answer: VoteAnswer.DISAGREE,
      },
      {
        id: '15',
        title: 'Установка электрических зарядных станций для автомобилей',
        content: 'Утвержден проект установки электрических зарядных станций для автомобилей на парковке. Проголосуйте за места установки и стоимость заряда.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-02-25T18:00:00Z',
        answer: VoteAnswer.AVOID,
      },
      {
        id: '16',
        title: 'Ремонт подъездов во всех домах комплекса',
        content: 'Принято решение о ремонте подъездов во всех домах комплекса. Участвуйте в выборе материалов и дизайна для обновленных подъездов.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-03-05T10:00:00Z',
        answer: VoteAnswer.AGREE,
      },
      {
        id: '17',
        title: 'Организация выставки местных художников',
        content: 'Предложение организовать выставку работ местных художников. Поддержите идеи по расположению работ и оформлению выставки.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-03-15T15:30:00Z',
        answer: VoteAnswer.DISAGREE,
      },
      {
        id: '18',
        title: 'Установка системы "умный дом" в общественных помещениях',
        content: 'Утвержден проект установки системы "умный дом" в общественных помещениях комплекса. Проголосуйте за функции и устройства, которые должны быть включены в систему.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-03-25T18:00:00Z',
        answer: VoteAnswer.AVOID,
      },
      {
        id: '19',
        title: 'Организация выставки местных ремесленников',
        content: 'Предложение организовать выставку работ местных ремесленников. Поддержите идеи по выбору категорий работ и критериям оценки.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-04-05T10:00:00Z',
        answer: VoteAnswer.AGREE,
      },
      {
        id: '20',
        title: 'Установка новых светодиодных фонарей на улицах комплекса',
        content: 'Утвержден проект установки новых светодиодных фонарей на улицах комплекса. Проголосуйте за места установки и яркость фонарей.',
        status: VoteStatus.COMPLETED,
        publishedAt: '2023-04-15T15:30:00Z',
        answer: VoteAnswer.DISAGREE,
      },
    ].map(item => ({
      ...item,
      __typename: 'VoteObject',
    }))

    return res(ctx.data({ votes }), ctx.delay('real'))
  }),
]

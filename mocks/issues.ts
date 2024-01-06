import { graphql } from 'msw'
import type { CreateIssue } from '@/issues/dto/create-issue'
import { IssueStatus } from '@/issues/constants/issue-status'
import type { Issue } from '@/issues/dto/issue'
import { faker } from '@/shared/utils/faker'

const server = graphql.link('http://127.0.0.1:5000/graphql')

export const issuesMock = [
  server.query<
        { issues: Issue[] },
        { buildingId: string }
    >('GetIssues', (req, res, ctx) => {
      const issues: Issue[] = [
        // 5 заявок со статусом SENT и датами в октябре и ноябре 2023 года
        {
          id: '1',
          title: 'Протечка крыши',
          content: 'Прошу проверить крышу в моей квартире, так как есть протечка в потолке.',
          status: IssueStatus.SENT,
          createdAt: '2023-10-15T10:00:00Z',
        },
        {
          id: '2',
          title: 'Не работает кондиционер',
          content: 'Мой кондиционер не включается. Пожалуйста, пришлите мастера для ремонта.',
          status: IssueStatus.SENT,
          createdAt: '2023-10-25T14:30:00Z',
        },
        {
          id: '3',
          title: 'Пропала горячая вода',
          content: 'У меня нет горячей воды уже несколько дней. Пожалуйста, уладьте эту проблему как можно скорее.',
          status: IssueStatus.SENT,
          createdAt: '2023-11-05T11:45:00Z',
        },
        {
          id: '4',
          title: 'Не работает домофон',
          content: 'Домофон в моей квартире не функционирует. Не могу открывать входную дверь. Пожалуйста, исправьте ситуацию.',
          status: IssueStatus.SENT,
          createdAt: '2023-11-15T16:20:00Z',
        },
        {
          id: '5',
          title: 'Проблемы с отоплением',
          content: 'Отопление не работает в моей квартире. Температура в помещении стала очень низкой. Пожалуйста, решите проблему.',
          status: IssueStatus.SENT,
          createdAt: '2023-11-25T09:15:00Z',
        },
        // 5 заявок со статусом PROGRESS и датами в октябре и сентябре 2023 года
        {
          id: '6',
          title: 'Не работает один из лифтов',
          content: 'Лифт в моем подъезде не функционирует сегодня утром. Не могу добраться до своего этажа.',
          status: IssueStatus.PROGRESS,
          createdAt: '2023-09-10T10:40:00Z',
        },
        {
          id: '7',
          title: 'Проблемы с электричеством',
          content: 'Часто происходят скачки напряжения в моей квартире. Это вызывает проблемы с электроприборами. Пожалуйста, проверьте электрическую сеть.',
          status: IssueStatus.PROGRESS,
          createdAt: '2023-09-20T13:50:00Z',
        },
        {
          id: '8',
          title: 'Не работает один из подъемников для инвалидов',
          content: 'Один из подъемников для инвалидов не функционирует. Это создает неудобства для наших жителей с ограниченными возможностями. Пожалуйста, почините его.',
          status: IssueStatus.PROGRESS,
          createdAt: '2023-10-05T15:30:00Z',
        },
        {
          id: '9',
          title: 'Протечка водопровода в подвале',
          content: 'В подвале замечена протечка водопровода. Вода стекает по стенам и полу. Пожалуйста, устраните утечку и осушите помещение.',
          status: IssueStatus.PROGRESS,
          createdAt: '2023-10-15T18:20:00Z',
        },
        {
          id: '10',
          title: 'Не работает один из фонарей во дворе',
          content: 'Фонарь во дворе не светит. Вечером во дворе темно и не безопасно. Пожалуйста, замените лампочку или почините фонарь.',
          status: IssueStatus.PROGRESS,
          createdAt: '2023-10-25T20:10:00Z',
        },
        // 10 заявок со статусом DONE и датами с января по август 2023 года
        {
          id: '11',
          title: 'Протечка канализационной трубы',
          content: 'Прошу проверить канализационные трубы в моей квартире, так как есть протечка.',
          status: IssueStatus.DONE,
          createdAt: '2023-01-05T10:00:00Z',
        },
        {
          id: '12',
          title: 'Неисправность электроплиты',
          content: 'Моя электроплита перестала включаться. Пожалуйста, отправьте электрика для ремонта.',
          status: IssueStatus.DONE,
          createdAt: '2023-02-15T14:30:00Z',
        },
        {
          id: '13',
          title: 'Пропал сигнал кабельного телевидения',
          content: 'У меня пропал сигнал кабельного телевидения. Пожалуйста, решите эту проблему как можно быстрее.',
          status: IssueStatus.DONE,
          createdAt: '2023-03-25T11:45:00Z',
        },
        {
          id: '14',
          title: 'Проблемы с дверным замком',
          content: 'Дверной замок в моей квартире не закрывается. Не могу войти внутрь. Пожалуйста, почините его.',
          status: IssueStatus.DONE,
          createdAt: '2023-04-10T16:20:00Z',
        },
        {
          id: '15',
          title: 'Неисправность стиральной машины',
          content: 'Моя стиральная машина не сливает воду после стирки. Пожалуйста, пришлите мастера для ремонта.',
          status: IssueStatus.DONE,
          createdAt: '2023-05-20T09:15:00Z',
        },
        {
          id: '16',
          title: 'Проблемы с интернет-подключением',
          content: 'Интернет периодически пропадает. Пожалуйста, уладьте эту проблему с провайдером.',
          status: IssueStatus.DONE,
          createdAt: '2023-06-05T10:40:00Z',
        },
        {
          id: '17',
          title: 'Не работает один из эскалаторов',
          content: 'Один из эскалаторов в подземном переходе не функционирует. Прошу починить его для удобства всех жителей.',
          status: IssueStatus.DONE,
          createdAt: '2023-07-15T13:50:00Z',
        },
        {
          id: '18',
          title: 'Протечка в канализации',
          content: 'Прошу проверить канализацию в моей квартире, так как есть протечка в трубах.',
          status: IssueStatus.DONE,
          createdAt: '2023-08-01T15:30:00Z',
        },
        {
          id: '19',
          title: 'Неисправность лифта',
          content: 'Лифт в нашем доме не поднимается на верхние этажи. Пожалуйста, устраните эту проблему.',
          status: IssueStatus.DONE,
          createdAt: '2023-08-15T18:20:00Z',
        },
        {
          id: '20',
          title: 'Проблемы с системой видеонаблюдения',
          content: 'Система видеонаблюдения в нашем подъезде не передает изображение. Прошу проверить и восстановить работоспособность.',
          status: IssueStatus.DONE,
          createdAt: '2023-08-25T20:10:00Z',
        },
      ].map(item => ({
        ...item,
        __typename: 'IssueObject',
      }))

      // Array.from(
      //   { length: 30 },
      //   (_, i) => ({
      //     id: faker.database.mongodbObjectId(),
      //     title: faker.lorem.sentence(),
      //     content: faker.lorem.paragraph(),
      //     status: faker.helpers.enumValue(IssueStatus),
      //     createdAt: faker.date.recent({ days: 30 }).toISOString(),
      //     __typename: 'IssueObject',
      //   }),
      // )

      return res(ctx.data({ issues }))
    }),
  server.mutation<
        { createIssue: Issue },
        { payload: CreateIssue; buildingId: string }
    >('CreateIssue', (req, res, ctx) => {
      const { payload } = req.variables

      const createIssue: Issue = {
        ...payload,
        id: faker.database.mongodbObjectId(),
        status: IssueStatus.SENT,
        createdAt: faker.date.recent({ days: 30 }).toISOString(),
        __typename: 'IssueObject',
      }

      return res(ctx.data({ createIssue }))
    }),
]

import { graphql } from 'msw'
import type { News } from '@/news/dto/news'

const server = graphql.link(`${import.meta.env.VITE_API_URL}/graphql`)

export const newsMock = [
  server.query<
        { news: News[] },
        { buildingId: string }
    >('GetNews', (req, res, ctx) => {
      const news: News[] = [
        {
          id: '1',
          title: 'Открытие нового детского игрового комплекса',
          content: 'Сегодня в нашем жилом комплексе открылся новый детский игровой комплекс. Теперь у наших детей есть уютное место для игр и веселья под присмотром опытных воспитателей.',
          publishedAt: '2023-11-06T10:00:00Z',
          image: new URL('../assets/playground.jpg', import.meta.url).href,
        },
        {
          id: '2',
          title: 'Организация тематической вечеринки для жителей',
          content: 'Вчера вечером наш жилой комплекс устроил тематическую вечеринку для всех жителей. Веселые конкурсы, угощения и хорошее настроение ждали каждого гостя.',
          publishedAt: '2023-11-05T15:30:00Z',
          image: new URL('../assets/party.jpg', import.meta.url).href,
        },
        {
          id: '3',
          title: 'Расширение парковочных мест',
          content: 'Наш жилой комплекс провел работы по расширению парковочных мест. Теперь у наших жителей есть еще больше места для комфортной парковки автомобилей.',
          publishedAt: '2023-11-04T18:45:00Z',
          image: new URL('../assets/parking.jpg', import.meta.url).href,
        },
        {
          id: '4',
          title: 'Поломка лифта в доме №5',
          content: 'Информируем жителей дома №5 о временной поломке лифта. Работы по устранению неполадок уже начались, приносим извинения за временные неудобства.',
          publishedAt: '2023-11-03T12:15:00Z',
          image: new URL('../assets/elevator.jpg', import.meta.url).href,
        },
        {
          id: '5',
          title: 'Ремонт крыши в доме №2',
          content: 'Начат капитальный ремонт крыши в доме №2. Работы планируются завершить в течение двух недель. Просим жителей быть бдительными вблизи стройплощадки.',
          publishedAt: '2023-11-02T09:30:00Z',
          image: new URL('../assets/roof.jpg', import.meta.url).href,
        },
        {
          id: '6',
          title: 'Завершение реконструкции парковой зоны',
          content: 'Парковая зона в нашем комплексе завершила реконструкцию. Теперь у наших жителей есть еще более красивое и ухоженное место для прогулок и отдыха.',
          publishedAt: '2023-11-01T14:00:00Z',
          image: new URL('../assets/park.jpg', import.meta.url).href,
        },
        {
          id: '7',
          title: 'Открытие фитнес-зала в клубном доме',
          content: 'Сегодня открылся новый фитнес-зал в клубном доме. Теперь жители могут заниматься спортом прямо внутри жилого комплекса.',
          publishedAt: '2023-10-31T11:30:00Z',
          image: new URL('../assets/gym.jpg', import.meta.url).href,
        },
        {
          id: '8',
          title: 'Проведение субботника во дворе',
          content: 'В ближайшую субботу организуется субботник во дворе. Приглашаем всех жителей присоединиться и вместе сделать наш жилой комплекс чище и ухоженнее.',
          publishedAt: '2023-10-30T16:45:00Z',
          image: new URL('../assets/yard.jpg', import.meta.url).href,
        },
        {
          id: '9',
          title: 'Информация по оплате коммунальных услуг',
          content: 'Напоминаем жителям о сроках и способах оплаты коммунальных услуг. Дополнительную информацию можно получить в офисе управляющей компании.',
          publishedAt: '2023-10-29T13:00:00Z',
          image: new URL('../assets/hau.jpeg', import.meta.url).href,
        },
        {
          id: '10',
          title: 'Планирование мероприятий на предстоящий месяц',
          content: 'Ждем ваши предложения по проведению мероприятий на следующий месяц. Пожалуйста, поделитесь своими идеями и пожеланиями в специальной группе.',
          publishedAt: '2023-10-28T09:00:00Z',
          image: new URL('../assets/ideas.jpg', import.meta.url).href,
        },
        {
          id: '11',
          title: 'Результаты голосования по обновлению детской площадки',
          content: 'По итогам голосования жители решили обновить детскую площадку. Подробности и план работ будут представлены в ближайшее время.',
          publishedAt: '2023-10-27T14:30:00Z',
          image: new URL('../assets/vote.jpg', import.meta.url).href,
        },
        {
          id: '12',
          title: 'Установка новых камер наблюдения',
          content: 'В целях обеспечения безопасности на территории жилого комплекса начата установка новых камер наблюдения. Просим жителей соблюдать правила безопасности.',
          publishedAt: '2023-10-26T12:15:00Z',
          image: new URL('../assets/camera.jpg', import.meta.url).href,
        },
      ].map(item => ({
        ...item,
        // image: faker.image.urlLoremFlickr({ category: 'nature' }),
        __typename: 'NewsObject',
      }))

      return res(ctx.data({ news }))
    }),
]

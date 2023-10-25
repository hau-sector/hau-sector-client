import { graphql } from 'msw'
import type { CreateIssue } from '@/issues/dto/create-issue'
import { IssueStatus } from '@/issues/constants/issue-status'
import type { Issue } from '@/issues/dto/issue'
import { faker } from '@/shared/utils/faker'

const server = graphql.link(`${import.meta.env.VITE_API_URL}/graphql`)

export const issuesMock = [
  server.query<
        { issues: Issue[] },
        { buildingId: string }
    >('GetIssues', (req, res, ctx) => {
      const issues: Issue[] = Array.from(
        { length: 100 },
        (_, i) => ({
          id: faker.database.mongodbObjectId(),
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          status: faker.helpers.enumValue(IssueStatus),
          createdAt: faker.date.recent({ days: 30 }).toISOString(),
          __typename: 'IssueObject',
        }),
      )

      return res(ctx.data({ issues }), ctx.delay('real'))
    }),
  server.mutation<
        { createIssue: Issue },
        { payload: CreateIssue; buildingId: string }
    >('CreateIssue', (req, res, ctx) => {
      const { payload } = req.variables

      const createIssue: Issue = {
        ...payload,
        id: faker.database.mongodbObjectId(),
        status: faker.helpers.enumValue(IssueStatus),
        createdAt: faker.date.recent({ days: 30 }).toISOString(),
        __typename: 'IssueObject',
      }

      return res(ctx.data({ createIssue }), ctx.delay('real'))
    }),
]

import gql from 'graphql-tag'
import type { IssueStatus } from '@/issues/constants/issue-status'

export interface Issue {
  id: string
  title: string
  content: string
  status: IssueStatus
  createdAt: string
  __typename: 'IssueObject'
}

export const ISSUE = gql`
    fragment Issue on IssueObject {
      id
      title
      content
      status
      createdAt
    }
`

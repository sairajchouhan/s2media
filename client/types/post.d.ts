import { UserWithProfile } from './user'
export interface PostWithUserAndProfile {
  caption: string
  createdAt: string
  id: string
  updatedAt: string
  url: string
  userId: string
  user: UserWithProfile
  _count: {
    like: number
    comment: number
  }
}
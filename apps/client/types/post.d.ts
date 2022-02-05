import { BaseUser } from './user'
export interface PostWithBaseUser {
  id: string
  caption: string
  url: string
  userId: string
  user: BaseUser
  like: Array<Record<any, any>>
  comment: Array<Record<any, any>>
  save: Array<Record<any, any>>
  createdAt: string
  updatedAt: string
  _count: {
    like: number
    comment: number
    reply: number
  }
}

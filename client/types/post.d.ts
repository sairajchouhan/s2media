import { BaseUser } from './user'
export interface PostWithBaseUser {
  caption: string
  id: string
  url: string
  userId: string
  user: BaseUser
  like: Array[any]
  comment: Array[any]
  createdAt: string
  updatedAt: string
  _count: {
    like: number
    comment: number
  }
}

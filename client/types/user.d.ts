export interface BaseUser {
  uid: string
  username: string
  email: string
  avatar: string | null
  provider: string
  createdAt: string
  updatedAt: string
  profile: {
    id: string
    bio: string | null
    displayName: string | null
    userId: string
    createdAt: string
    updatedAt: string
  }
  save: Array<Record<any, any>>
  _count: {
    save: number
    post: number
    followers: number
    following: number
  }
}

export interface AuthUser extends BaseUser {
  idToken: string
}

export interface ProfileUser extends BaseUser {}

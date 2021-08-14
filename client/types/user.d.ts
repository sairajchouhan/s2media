export interface SessionUser {
  accessToken: string
  avatar: string
  email: string
  id: string
  username: string
  displayName: string
}

export interface User {
  uid: string
  idToken: string
  email: string
  username: string
  avatar: string
  provider: string
  _count: {
    post: number
    followers: number
    following: number
  }
  createdAt: string
  updatedAt: string
  following: Array<any>
  followers: Array<any>
}

export interface Profile {
  id: string
  bio?: string | null
  displayName?: string | null
  userId: string
  updatedAt: string
  createdAt: string
}

export interface UserWithProfile extends User {
  profile: Profile
}

export interface UserFullDetails extends UserWithProfile {
  post: Post[]
}

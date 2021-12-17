export type JwtPaylod = {
  id: string
  username: string
  email: string
  avatar: string
}

export type DecodedIdToken = {
  aud: string
  auth_time: number
  email: string
  email_verified?: boolean
  exp: number
  iat: number
  iss: string
  phone_number?: string
  picture?: string
  sub: string
  uid: string
  firebase: {
    identities: {
      [key: string]: any
    }
    sign_in_provider: string
    sign_in_second_factor?: string
    second_factor_identifier?: string
    tenant?: string
    [key: string]: any
  }
}

export type NotificationType =
  | 'like_post'
  | 'like_comment'
  | 'like_reply'
  | 'reply_to_comment'
  | 'comment_on_post'
  | 'follow'

export interface Notification {
  id?: string
  type: NotificationType
  userIdWhoReceivesNotification: string
  userWhoCausedNotification: any
  post_id?: string
  comment_id?: string
  reply_id?: string
  meta?: any
  timestamp?: Date
  isRead: boolean
}

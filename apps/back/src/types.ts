export type NotificationType =
  | 'like_post'
  | 'like_comment'
  | 'like_reply'
  | 'reply_to_comment'
  | 'comment_on_post'

export interface Notification {
  id?: string
  type: NotificationType
  userIdWhoReceivesNotification: string
  userWhoCausedNotification: any
  post_id: string
  comment_id?: string
  reply_id?: string
  meta?: any
  timestamp?: Date
  isRead: boolean
}

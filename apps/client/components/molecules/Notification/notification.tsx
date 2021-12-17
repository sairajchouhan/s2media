import React, { useState } from 'react'
import Link from 'next/link'
import { Notification } from '../../../types/notification'
import { useAuth } from '../../../context/authContext'
import { axios } from '../../../config/axios'
import { Avatar } from '../../atoms/Avatar'

const genNotitification = (notificationObj: Notification) => {
  const notification = {
    string: '',
    href: `/post/${notificationObj.post_id}`,
    jsx: <></>,
  }

  switch (notificationObj.type) {
    case 'like_post':
      notification.jsx = (
        <p>
          <span className="font-semibold text-indigo-500">
            @{notificationObj.userWhoCausedNotification.username}
          </span>{' '}
          liked your post
        </p>
      )
      break

    case 'like_comment':
      notification.jsx = (
        <p>
          <span className="font-semibold text-indigo-500">
            @{notificationObj.userWhoCausedNotification.username}
          </span>{' '}
          liked your comment{' '}
          {notificationObj.meta.commentText ? (
            <span className="font-semibold text-indigo-500 truncate">
              {notificationObj.meta.commentText.slice(0, 10)}...
            </span>
          ) : null}
        </p>
      )
      break

    case 'like_reply':
      notification.jsx = (
        <p>
          <span className="font-semibold text-indigo-500">
            @{notificationObj.userWhoCausedNotification.username}
          </span>{' '}
          liked your reply{' '}
          {notificationObj.meta.replyText ? (
            <span className="font-semibold text-indigo-500 truncate">
              {notificationObj.meta.replyText.slice(0, 10)}...
            </span>
          ) : null}
        </p>
      )
      break

    case 'reply_to_comment':
      notification.jsx = (
        <p>
          <span className="font-semibold text-indigo-500">
            @{notificationObj.userWhoCausedNotification.username}
          </span>{' '}
          replied{' '}
          {notificationObj.meta.replyText ? (
            <span className="font-semibold text-indigo-500 truncate">
              {notificationObj.meta.replyText.slice(0, 10)}...
            </span>
          ) : null}{' '}
          to your comment{' '}
          {notificationObj.meta.commentText ? (
            <span className="font-semibold text-indigo-500 truncate">
              {notificationObj.meta.commentText.slice(0, 10)}...
            </span>
          ) : null}
        </p>
      )
      break

    case 'comment_on_post':
      notification.jsx = (
        <p>
          <span className="font-semibold text-indigo-500">
            @{notificationObj.userWhoCausedNotification.username}
          </span>{' '}
          commented{' '}
          {notificationObj.meta.commentText ? (
            <span className="font-semibold text-indigo-500 truncate">
              {notificationObj.meta.commentText.slice(0, 10)}...
            </span>
          ) : null}{' '}
          on your post
        </p>
      )
      break
    case 'follow':
      notification.jsx = (
        <p>
          <span className="font-semibold text-indigo-500">
            @{notificationObj.userWhoCausedNotification.username}
          </span>{' '}
          started following you{' '}
        </p>
      )
      break
    case 'user_sign_up':
      notification.jsx = (
        <p>
          Welcome{' '}
          <span className="font-semibold text-indigo-500">
            {notificationObj.meta.user?.profile?.displayName ?? notificationObj.meta.user.username}
          </span>{' '}
          to S2Media I am glad you are here {'🥳 🎉 '}
        </p>
      )
      break
  }
  return notification
}

interface INotification {
  notification: Notification
}

const genNotificationHref = (noti: Notification) => {
  if (noti.type === 'follow') {
    return `/profile/${noti.userWhoCausedNotification.username}`
  }
  return `/post/${noti.post_id}`
}

export const NotificationComp = ({ notification }: INotification) => {
  const { getIdToken } = useAuth()
  const [href] = useState(() => genNotificationHref(notification))
  const [notiJsx] = useState(() => genNotitification(notification).jsx)

  const markNotificationRead = async (notification: Notification) => {
    if (notification.isRead) return
    try {
      const res = await axios.post(
        `/notification/${notification.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await getIdToken()}`,
          },
        }
      )
      console.log(res)
    } catch (err) {
      console.log('notification is already marked as read')
    }
  }

  return (
    <Link href={notification.type === 'user_sign_up' ? '' : href}>
      <a onClick={() => markNotificationRead(notification)}>
        <div
          className={`p-3 cursor-pointer border-b border-opacity-80 ${
            !notification.isRead ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex items-center">
            <Avatar src={notification.userWhoCausedNotification.avatar} w="w-10" h="h-10" />
            <div className="ml-4">{notiJsx}</div>
          </div>
        </div>
      </a>
    </Link>
  )
}

import Head from 'next/head'
import { Avatar } from '../../components/atoms/Avatar'
import { PageLayout } from '../../components/molecules/Page'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { useSocket } from '../../context/socketContext'
import Link from 'next/link'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'

type NotificationType = 'like_post' | 'like_comment' | 'reply_to_comment' | 'comment_on_post'
interface Notification {
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
const constructNotitification = (notificationObj: Notification) => {
  const notification = {
    string: '',
    href: `/post/${notificationObj.post_id}`,
  }

  switch (notificationObj.type) {
    case 'like_post':
      notification.string = `${notificationObj.userWhoCausedNotification.username} liked your post`
      break

    case 'like_comment':
      notification.string = `${notificationObj.userWhoCausedNotification.username} liked your comment`
      break

    case 'reply_to_comment':
      notification.string = `${notificationObj.userWhoCausedNotification.username} replied to your comment`
      break

    case 'comment_on_post':
      notification.string = `${notificationObj.userWhoCausedNotification.username} commented on your post`
      break
  }
  return notification
}

const Notifications = () => {
  const notifications = useSocket()
  const { getIdToken } = useAuth()

  const markNotificationRead = async (notification: Notification) => {
    console.log(notification)
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
  }

  console.log(notifications)

  return (
    <PageLayout>
      <Head>
        <title>Notifications / S2Media</title>
      </Head>
      <PageNav title="Notifications" />
      <main className="flex flex-col justify-center">
        {notifications && notifications.notifications ? (
          notifications?.notifications.map((noti: Notification) => (
            <Link href={constructNotitification(noti).href} key={noti.id}>
              <a onClick={() => markNotificationRead(noti)}>
                <div key={noti.id} className={`p-3 cursor-pointer border-b border-opacity-80`}>
                  <div className="flex items-center">
                    <Avatar src={noti.userWhoCausedNotification.avatar} w="w-10" h="h-10" />
                    <p className="ml-4">{constructNotitification(noti).string}</p>
                  </div>
                </div>
              </a>
            </Link>
          ))
        ) : (
          <div>No notifications for now</div>
        )}
      </main>
    </PageLayout>
  )
}

export default Notifications

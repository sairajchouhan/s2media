import Head from 'next/head'
import { PageLayout } from '../../components/molecules/Page'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { useSocket } from '../../context/socketContext'
import { Notification } from '../../types'
import { NotificationComp } from '../../components/molecules/Notification'

const Notifications = () => {
  const notifications = useSocket()
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
            <NotificationComp notification={noti} key={noti.id} />
          ))
        ) : (
          <div>No notifications for now</div>
        )}
      </main>
    </PageLayout>
  )
}

export default Notifications

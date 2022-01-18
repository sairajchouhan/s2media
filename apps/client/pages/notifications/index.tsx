import Head from 'next/head'
import { PageLayout } from '../../components/molecules/Page'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { useSocket } from '../../context/socketContext'
import { Notification } from '../../types'
import { NotificationComp } from '../../components/molecules/Notification'

const Notifications = () => {
  const notifications = useSocket()

  return (
    <PageLayout>
      <Head>
        <title>Notifications / S2Media</title>
      </Head>
      <PageNav title="Notifications" />
      <main className="flex flex-col justify-center">
        {notifications && notifications?.notifications?.length > 0 ? (
          notifications?.notifications.map((noti: Notification) => (
            <NotificationComp notification={noti} key={noti.id} />
          ))
        ) : (
          <div className="px-4">
            <h2 className="mt-6 text-3xl text-center text-indigo-500 ">No Notifications for now</h2>
          </div>
        )}
      </main>
    </PageLayout>
  )
}

export default Notifications

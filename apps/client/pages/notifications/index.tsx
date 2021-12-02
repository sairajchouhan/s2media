import Head from 'next/head'
import { useEffect } from 'react'
import { Button } from '../../components/atoms/Button/Button'
import { PageLayout } from '../../components/molecules/Page'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { useAuth } from '../../context/authContext'
import { useSocket } from '../../context/socketContext'
import { useToast } from '../../context/toastContext'

const Notifications = () => {
  const toast = useToast()
  const { user } = useAuth()
  const socket = useSocket()

  useEffect(() => {
    if (socket) {
      socket.on('NOTIFICATION', (data) => {
        console.log(data)
      })

      if (user) {
        socket.emit('GIVE_MY_NOTIFICATIONS', {
          userId: user?.uid,
        })
      }
    }
  }, [socket, user])

  return (
    <PageLayout>
      <Head>
        <title>Notifications / S2Media</title>
      </Head>
      <PageNav title="Notifications" />
      <main className="flex justify-center px-2 mt-5">
        <div className="text-4xl">🚧 under construction</div>
        <Button onClick={() => toast({ message: 'Hi man', type: 'error' })}>Yo</Button>
      </main>
    </PageLayout>
  )
}

export default Notifications

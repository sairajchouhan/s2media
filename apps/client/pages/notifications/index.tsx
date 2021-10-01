import Head from 'next/head'
import { PageNav } from '../../components/molecules/Page/page-nav'

const Notifications = () => {
  return (
    <div className="min-h-screen border-l border-r border-opacity-80">
      <Head>
        <title>Notifications / S2Media</title>
      </Head>
      <PageNav title="Notifications" />
      <main className="flex justify-center px-2 mt-5">
        <div className="text-4xl">🚧 under construction</div>
      </main>
    </div>
  )
}

export default Notifications

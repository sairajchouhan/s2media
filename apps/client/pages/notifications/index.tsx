import Head from 'next/head'
import { PageLayout } from '../../components/molecules/Page'
import { PageNav } from '../../components/molecules/Page/page-nav'

const Notifications = () => {
  return (
    <PageLayout>
      <Head>
        <title>Notifications / S2Media</title>
      </Head>
      <PageNav title="Notifications" />
      <main className="flex justify-center px-2 mt-5">
        <div className="text-4xl">🚧 under construction</div>
      </main>
    </PageLayout>
  )
}

export default Notifications

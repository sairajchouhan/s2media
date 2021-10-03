import Head from 'next/head'
import { PageNav } from '../../components/molecules/Page'
import { PageLayout } from '../../components/molecules/Page/page-layout'

const Messages = () => {
  return (
    <PageLayout>
      <Head>
        <title>Messages / S2Media</title>
      </Head>
      <PageNav title="Messages" />
      <main className="flex justify-center px-2 mt-5">
        <div className="text-4xl">🚧 under construction</div>
      </main>
    </PageLayout>
  )
}

export default Messages

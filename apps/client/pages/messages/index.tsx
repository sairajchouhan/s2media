import Head from 'next/head'
import { PageNav } from '../../components/molecules/Page'

const Messages = () => {
  return (
    <div className="min-h-screen border-l border-r border-opacity-80">
      <Head>
        <title>Messages / S2Media</title>
      </Head>

      <PageNav title="Messages" />
      <main className="flex justify-center px-2 mt-5">
        <div className="text-4xl">🚧 under construction</div>
      </main>
    </div>
  )
}

export default Messages

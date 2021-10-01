import Head from 'next/head'
import { PageNav } from '../../components/molecules/Page/page-nav'

const Saved = () => {
  return (
    <div className="min-h-screen border-l border-r border-opacity-80">
      <Head>
        <title>Saved / S2Media</title>
      </Head>
      <PageNav title="Saved" />
      <main className="px-2">Saved Posts</main>
    </div>
  )
}

export default Saved

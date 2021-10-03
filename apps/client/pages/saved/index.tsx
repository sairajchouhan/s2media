import Head from 'next/head'
import { PageLayout } from '../../components/molecules/Page/page-layout'
import { PageNav } from '../../components/molecules/Page/page-nav'

const Saved = () => {
  return (
    <PageLayout>
      <Head>
        <title>Saved / S2Media</title>
      </Head>
      <PageNav title="Saved" />
      <main className="px-2">Saved Posts</main>
    </PageLayout>
  )
}

export default Saved

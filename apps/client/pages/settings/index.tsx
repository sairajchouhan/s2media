import Head from 'next/head'
import { CircleLoader } from '../../components/atoms/CircleLoader'
import { PageLayout } from '../../components/molecules/Page'
import { PageNav } from '../../components/molecules/Page/page-nav'

const Settings = () => {
  return (
    <PageLayout>
      <Head>
        <title>Settings / S2Media</title>
      </Head>
      <PageNav title="Settings" />

      <main className="flex flex-col justify-center px-2 mt-5">
        <div className="text-4xl">🚧 under construction</div>
        <div className="mt-5">
          <CircleLoader />
        </div>
      </main>
    </PageLayout>
  )
}

export default Settings

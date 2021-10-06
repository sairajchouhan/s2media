import { Switch } from '@headlessui/react'
import Head from 'next/head'
import { useState } from 'react'
import { PageLayout } from '../../components/molecules/Page'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { useAuth } from '../../context/authContext'

const Settings = () => {
  const { user } = useAuth()
  const [enabled, setEnabled] = useState(() => user?.profileType === 'PRIVATE')

  console.log(enabled)

  return (
    <PageLayout>
      <Head>
        <title>Settings / S2Media</title>
      </Head>
      <PageNav title="Settings" />
      <main className="flex flex-col justify-center ">
        <div className="px-4 py-4 hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-lg">Private Account</p>
            <div>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${
                  enabled ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={`${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </Switch>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  )
}

export default Settings

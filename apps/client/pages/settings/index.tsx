import { Switch } from '@headlessui/react'
import Head from 'next/head'
import { useState } from 'react'
import { Button } from '../../components/atoms/Button'
import { Model } from '../../components/molecules/Model/model'
import { PageLayout } from '../../components/molecules/Page'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { CHANGE_USER_PROFILE_TYPE } from '../../utils/querykeysAndPaths'

const Settings = () => {
  const { user, getIdToken } = useAuth()
  const [enabled, setEnabled] = useState(() => user?.profileType === 'PRIVATE')
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen((open) => !open)
    setTimeout(() => {
      setEnabled(user?.profileType === 'PRIVATE')
    }, 500)
  }

  console.log(enabled)

  const handleProfileTypeChange = async () => {
    try {
      await axios.post(
        CHANGE_USER_PROFILE_TYPE.path,
        { type: enabled ? 'PRIVATE' : 'PUBLIC' },
        {
          headers: {
            Authorization: `Bearer ${await getIdToken()}`,
          },
        }
      )
      toggleOpen()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <PageLayout>
      <Head>
        <title>Settings / S2Media</title>
      </Head>
      <PageNav title="Settings" />
      <main className="flex flex-col justify-center ">
        <div className="px-4 py-4 cursor-pointer hover:bg-gray-50" onClick={toggleOpen}>
          <div className="flex items-center justify-between">
            <p className="">Change Profile Type</p>
            <p className="text-sm font-bold">Your Account is {user?.profileType}</p>
          </div>
        </div>
        <div className="px-4 py-4 cursor-pointer hover:bg-gray-50">
          <div className="flex items-center justify-between">
            <p className="text-red-500">Delete Your Account</p>
          </div>
        </div>
        <Model open={open} toggleOpen={toggleOpen}>
          <Model.Head toggleOpen={toggleOpen} title="Change Profile Type" />
          <Model.Body>
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
          </Model.Body>

          <Model.Foot>
            <div className="flex items-center justify-end">
              <Button
                disabled={user?.profileType === (enabled ? 'PRIVATE' : 'PUBLIC')}
                variant="outline"
                colorScheme="green"
                onClick={handleProfileTypeChange}
              >
                Save Changes
              </Button>
            </div>
          </Model.Foot>
        </Model>
      </main>
    </PageLayout>
  )
}

export default Settings

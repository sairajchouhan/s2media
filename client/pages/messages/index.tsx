import React, { useState } from 'react'
import { AutoGrowTextArea } from '../../components/atoms/AutoGrowTextArea/auto-grow-text-area'
import { Avatar } from '../../components/atoms/Avatar'
import { Model } from '../../components/molecules/Model'
import { PageNav } from '../../components/molecules/Page'
import PrivateRoute from '../../components/PrivateRoute'
import { useUser } from '../../hooks/useUser'

const Messages = () => {
  const [open, setOpen] = useState(false)
  const user = useUser()
  const toggleOpen = () => {
    setOpen((open) => !open)
  }

  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  if (!user) return null
  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Messages" />
        <main className="px-2">
          <button onClick={() => setOpen(!open)}>click me</button>
          <Model open={open} toggleOpen={toggleOpen} initialFoucsRef={textareaRef}>
            <Model.Head title="Create Post" toggleOpen={toggleOpen} />
            <Model.Body>
              <div className="flex items-start h-full mt-4 space-x-4">
                <div className="h-full">
                  <Avatar src={user.avatar} w="w-10" h="h-10" alt="authenticated user avatar" />
                </div>
                <div className="flex items-center flex-1 h-full">
                  <AutoGrowTextArea initialFocusRef={textareaRef} />
                </div>
              </div>
            </Model.Body>
            <Model.Foot>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => {}}
                >
                  Upload
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => {}}
                >
                  Post
                </button>
              </div>
            </Model.Foot>
          </Model>
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Messages

import React, { useState } from 'react'
import { Model } from '../../components/molecules/Model'
import { PageNav } from '../../components/molecules/Page'
import PrivateRoute from '../../components/PrivateRoute'

const Messages = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen((open) => !open)
  }

  console.log(open)
  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Messages" />
        <main className="px-2">
          <button onClick={() => setOpen(!open)}>click me</button>
          <Model open={open} toggleOpen={toggleOpen}>
            <Model.Head title="yooo" toggleOpen={toggleOpen} />
            <Model.Body>this is a model body</Model.Body>
            <Model.Foot>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                onClick={() => {}}
              >
                primary action
              </button>
            </Model.Foot>
          </Model>
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Messages

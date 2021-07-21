import React from 'react'
import { Button } from '../../components/atoms/Button'
import { PageNav } from '../../components/molecules/Page'
import PrivateRoute from '../../components/PrivateRoute'
import { useUser } from '../../hooks/useUser'

const Messages = () => {
  const user = useUser()
  if (!user) return null
  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Messages" />
        <main className="px-2 pl-10 mt-5">
          <div>
            <Button colorScheme="indigo">Click Me</Button>
            <Button colorScheme="green">Click Me</Button>
            <Button colorScheme="red">Click Me</Button>
            <Button colorScheme="gray">Click Me</Button>
          </div>
          <div className="mt-10">
            <Button variant="outline" colorScheme="indigo">
              Click Me
            </Button>
            <Button variant="outline" colorScheme="green">
              Click Me
            </Button>
            <Button variant="outline" colorScheme="red">
              Click Me
            </Button>
            <Button variant="outline" colorScheme="gray">
              Click Me
            </Button>
          </div>
          <div className="mt-10"></div>
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Messages

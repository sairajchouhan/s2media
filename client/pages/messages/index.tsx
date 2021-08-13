import React from 'react'
import { Button } from '../../components/atoms/Button'
import AuthenticatedLayout from '../../components/layouts/AuthenticatedLayout'
import { PageNav } from '../../components/molecules/Page'

const Messages = () => {
  // const { user } = useAuth()

  return (
    <AuthenticatedLayout>
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
    </AuthenticatedLayout>
  )
}

export default Messages

import { useSession } from 'next-auth/client'
import React from 'react'
import { Post } from '../../components/organisms/Post'
import Stories from '../../components/organisms/Stories'
import PrivateRoute from '../../components/PrivateRoute'

const urls = [
  'https://images.unsplash.com/photo-1625482107418-828242ae20be?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1625476903534-ae531b76e8c9?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw0OXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1625423842633-be27178d25e7?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3NXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
]

const Home = () => {
  const [session] = useSession()
  console.log(session)

  return (
    <PrivateRoute>
      <div className="h-full">
        <Stories />
        <main className="mt-6">
          {urls.map((url) => (
            <React.Fragment key={url}>
              <Post url={url} />
            </React.Fragment>
          ))}
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Home

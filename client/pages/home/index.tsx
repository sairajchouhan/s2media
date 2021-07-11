import axios from 'axios'
import { useSession } from 'next-auth/client'
import React, { useEffect, useState } from 'react'
import { Post } from '../../components/organisms/Post'
import Stories from '../../components/organisms/Stories'
import PrivateRoute from '../../components/PrivateRoute'

const Home = () => {
  const [session] = useSession()
  console.log(session)
  const [posts, setPosts] = useState<any>([])
  const [l, setL] = useState(true)

  useEffect(() => {
    ;(async () => {
      const res = await axios.get('http://localhost:5000/api/v1/post')
      setPosts(res.data)
      setL(false)
    })()
  }, [])

  if (!session) return null

  return (
    <PrivateRoute>
      <div className="h-full">
        <Stories />
        <main>
          {l ? (
            <h1>Loading...</h1>
          ) : (
            posts.map((post: any) => (
              <React.Fragment key={post.id}>
                <Post id={post.id} url={post.url} caption={post.caption} />
              </React.Fragment>
            ))
          )}
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Home

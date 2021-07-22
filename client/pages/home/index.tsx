import axios from 'axios'
import { useSession } from 'next-auth/client'
import React from 'react'
import { useQuery } from 'react-query'
import { Post } from '../../components/organisms/Post'
import Stories from '../../components/organisms/Stories'
import PrivateRoute from '../../components/PrivateRoute'
import { PostWithUserAndProfile } from '../../types/post'

const Home = () => {
  const [session] = useSession()

  const { data: posts, isLoading } = useQuery('posts', async () => {
    const posts = await axios.get('http://localhost:5000/api/v1/post')
    return posts.data
  })

  if (!session) return null

  return (
    <PrivateRoute>
      <div className="h-full border-l border-r border-opacity-80">
        <Stories />
        <main>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            posts.map((post: PostWithUserAndProfile) => (
              <React.Fragment key={post.id}>
                <Post post={post} />
              </React.Fragment>
            ))
          )}
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Home

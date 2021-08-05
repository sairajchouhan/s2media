import React from 'react'
import { Post } from '../../components/organisms/Post'
import Stories from '../../components/organisms/Stories'
import PrivateRoute from '../../components/PrivateRoute'
import { useQuery } from '../../hooks/useQuery'
import { useUser } from '../../hooks/useUser'
import { PostWithUserAndProfile } from '../../types/post'

const Home = () => {
  const user = useUser()
  const { data: posts, loading, error } = useQuery('/post')

  if (!user) return null
  if (error) return <p>Error!</p>
  if (loading || !posts) return <p>Loading...</p>

  return (
    <PrivateRoute>
      <div className="h-full border-l border-r border-opacity-80">
        <Stories />
        <main>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            posts.map((post: PostWithUserAndProfile) => (
              <React.Fragment key={post.id}>
                <Post post={post} />
              </React.Fragment>
            ))
          )}
          {/* {!isLoading && (
            <React.Fragment>
              <Post post={posts[0]} />
            </React.Fragment>
          )} */}
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Home

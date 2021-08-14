import React from 'react'
import { Post } from '../../components/organisms/Post'
import Stories from '../../components/organisms/Stories'
import { useQuery } from '../../hooks/useQuery'
import { PostWithUserAndProfile } from '../../types/post'

const Home = () => {
  const { data: posts, loading, error } = useQuery('/post')

  if (error) return <p>Error!</p>
  if (loading || !posts) return <p>Loading...</p>

  return (
    <>
      <div className="h-full border-l border-r border-opacity-80">
        <Stories />
        <main>
          {loading ? (
            <h1 className="text-green-700 text-7xl">Loading...</h1>
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
    </>
  )
}

export default Home

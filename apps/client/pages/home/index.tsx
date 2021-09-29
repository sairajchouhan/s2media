import React from 'react'
import { Post } from '../../components/organisms/Post'
import { useQuery } from '../../hooks/useQuery'
import { PostWithBaseUser } from '../../types/post'

const Home = () => {
  const { data: posts, loading, error } = useQuery('/post')

  if (error) return <p>Error!</p>

  return (
    <>
      <div className="h-full border-l border-r border-opacity-80">
        {/* <Stories /> */}

        <main>
          {loading ? (
            <h1 className="text-4xl text-center text-indigo-500">Loading...</h1>
          ) : (
            posts.map((post: PostWithBaseUser) => (
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { idk } = nookies.get(ctx)

//   if (!idk) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

//   let data
//   try {
//     const res = await axios.get(`/post`)
//     data = res.data
//   } catch (err) {
//     console.log(err)
//   }

//   return {
//     props: {
//       serverPosts: data,
//     },
//   }
// }

export default Home

import Head from 'next/head'
import React from 'react'
import { CircleLoader } from '../../components/atoms/CircleLoader'
import { PageLayout } from '../../components/molecules/Page'
import { Post } from '../../components/organisms/Post'
import { useQuery } from '../../hooks/useQuery'
import { PostWithBaseUser } from '../../types/post'

const Home = () => {
  const { data: posts, loading, error } = useQuery('/post')

  if (error) return <p>Error!</p>

  return (
    <>
      <Head>
        <title>Home / S2Media</title>
      </Head>
      <PageLayout>
        {/* <Stories /> */}
        <main className="">
          {loading ? (
            <CircleLoader className="pt-10" />
          ) : posts.length === 0 ? (
            <h1 className="pt-10 text-4xl text-center text-indigo-500">No posts yet</h1>
          ) : (
            posts.map((post: PostWithBaseUser) => (
              <React.Fragment key={post.id}>
                <Post post={post} />
              </React.Fragment>
            ))
          )}
        </main>
      </PageLayout>
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

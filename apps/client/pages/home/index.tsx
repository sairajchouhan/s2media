import Head from 'next/head'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { CircleLoader } from '../../components/atoms/CircleLoader'
import { PageLayout } from '../../components/molecules/Page'
import { Post } from '../../components/organisms/Post'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { PostWithBaseUser } from '../../types/post'
import { GET_POSTS_FOR_HOME } from '../../utils/querykeysAndPaths'

const Home = () => {
  const { ref, inView } = useInView()
  const { getIdToken } = useAuth()

  const {
    data: posts,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery(
    GET_POSTS_FOR_HOME.queryKey(),
    async ({ pageParam = '' }) => {
      const token = await getIdToken()
      const { data } = await axios.get(GET_POSTS_FOR_HOME.path(pageParam), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data
    },
    {
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor ?? false
      },
      retry: false,
    }
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, inView])

  if (isError) return <p>Error!</p>

  return (
    <>
      <Head>
        <title>Home / S2Media</title>
      </Head>
      <PageLayout>
        {/* <Stories /> */}
        <main>
          {isLoading ? (
            <CircleLoader className="pt-10" />
          ) : (
            posts &&
            posts.pages.map((page: any) => (
              <React.Fragment key={page.nextCursor || 'undefined'}>
                {page.posts.map((post: PostWithBaseUser) => (
                  <React.Fragment key={post.id}>
                    <Post post={post} />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))
          )}
          <span style={{ visibility: 'hidden' }} ref={ref}>
            intersection observer marker
          </span>
          {isFetchingNextPage ? <CircleLoader className="pb-10" /> : null}
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

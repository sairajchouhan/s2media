import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { ProfileCard } from '../../components/molecules/Profile'
import ProfileNav from '../../components/molecules/Profile/profile-nav'
import { Post } from '../../components/organisms/Post'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { PostWithBaseUser } from '../../types/post'
import { formQueryString } from '../../utils/helpers'

const Profile = () => {
  const router = useRouter()
  const { getIdToken } = useAuth()
  const [active, setActive] = useState<'all' | 'saved' | 'liked'>('all')

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery(
    ['user', (router as any).query.index[0]],
    async ({ queryKey }) => {
      const idToken = await getIdToken()
      const { data } = await axios.get(`/user/${queryKey[1]}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
      return data
    },
    {
      enabled: !!(router as any).query.index[0],
    }
  )

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
    isIdle: isIdlePosts,
    refetch,
  } = useQuery(
    ['user', 'post', (router as any).query.index[0]],
    async ({ queryKey }) => {
      console.log(queryKey)
      const idToken = await getIdToken()
      const qsObj: Record<string, any> = { username: queryKey[2] }
      const { index: query } = router.query
      if (!query) return
      if (query.includes('liked')) {
        qsObj.like = true
      }
      if (query.includes('saved')) {
        qsObj.save = true
      }
      const qs = formQueryString(qsObj)
      const { data } = await axios.get(`/post${qs}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
      const nowActive = qsObj.like ? 'liked' : qsObj.save ? 'saved' : 'all'
      setActive(nowActive)
      return data
    },
    {
      enabled: !!user,
    }
  )
  console.log(router.query)

  useEffect(() => {
    if (router.query) {
      const routeType = (router as any).query.index[1]
      const baseRoute = (router as any).query.index[0]
      if (routeType === 'liked' || routeType === 'saved' || baseRoute) {
        refetch()
      }
    }
  }, [router, refetch])

  if (isError || isErrorPosts) return <div>Something went wrong</div>
  if (isLoading || isLoadingPosts) return <div>Loading...</div>
  if (!isLoading && isIdlePosts) return <div>Something went wrong</div>

  return (
    <div className="min-h-screen border-l border-r border-opacity-80">
      <PageNav title="Profile" subtitle={`@${user.username}`} />
      <main className="flex flex-col mt-4">
        <ProfileCard user={user} />
        <ProfileNav active={active} username={user.username} />

        <section className="mb-4">
          {isLoading || isLoadingPosts ? (
            <h1 className="mt-5 text-4xl text-center text-indigo-500">Loading...</h1>
          ) : posts.length > 0 ? (
            posts.map((post: PostWithBaseUser) => <Post key={post.id} post={post} />)
          ) : (
            <h1 className="mt-5 text-4xl text-center text-indigo-500">
              No {active !== 'all' ? active : ''} posts yet
            </h1>
          )}
        </section>
      </main>
    </div>
  )
}

export default Profile

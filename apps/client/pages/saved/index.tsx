import Head from 'next/head'
import { useQuery } from 'react-query'
import { CircleLoader } from '../../components/atoms/CircleLoader'
import { PageLayout } from '../../components/molecules/Page/page-layout'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { Post } from '../../components/organisms/Post'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { formQueryString } from '../../utils/helpers'
import { GET_PROFILE_USER_POSTS } from '../../utils/querykeysAndPaths'

const Saved = () => {
  const { getIdToken, rqUser } = useAuth()

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery(GET_PROFILE_USER_POSTS.queryKey(rqUser.username), async () => {
    const idToken = await getIdToken()
    const qsObj: Record<string, any> = { username: rqUser.username, save: true }
    const qs = formQueryString(qsObj)
    const { data } = await axios.get(GET_PROFILE_USER_POSTS.path(rqUser.username, qs), {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    })
    return data.posts
  })

  if (isError) return <div>Something Went worng, Try again :(</div>

  return (
    <>
      <Head>
        <title>Home / S2Media</title>
      </Head>
      <PageLayout>
        <PageNav title="Saved" />
        <main>
          {isLoading ? (
            <CircleLoader className="pt-10" />
          ) : posts ? (
            posts.map((post: any) => <Post key={post.id} post={post} />)
          ) : null}
        </main>
      </PageLayout>
    </>
  )
}

export default Saved

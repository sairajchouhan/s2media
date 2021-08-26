import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Link } from '../../components/Link'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { ProfileCard } from '../../components/molecules/Profile'
import { Post } from '../../components/organisms/Post'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { PostWithBaseUser } from '../../types/post'
import { formQueryString } from '../../utils/helpers'
import { paths } from '../../utils/paths'

const Profile = () => {
  const router = useRouter()
  const { user: userFullDetails } = useAuth()
  const [posts, setPosts] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [active, setActive] = useState('all')
  console.log(active)

  useEffect(() => {
    const func = async () => {
      setError(false)
      const qsObj: Record<string, any> = { userId: userFullDetails?.uid }
      const { index: query } = router.query
      if (!query) return
      if (query.includes('liked')) {
        qsObj.like = true
      }
      if (query.includes('saved')) {
        qsObj.save = true
      }
      const qs = formQueryString(qsObj)
      const nowActive = qsObj.like ? 'liked' : qsObj.save ? 'saved' : 'all'
      setActive(nowActive)
      try {
        setLoading(true)
        const { data } = await axios.get(`/post${qs}`, {
          headers: {
            Authorization: `Bearer ${userFullDetails?.idToken}`,
          },
        })
        setPosts(data)
      } catch (err) {
        console.error(err)
        setError(true)
      }
      setLoading(false)
    }
    func()
  }, [router.query, userFullDetails?.uid, userFullDetails?.idToken])

  if (!userFullDetails) return
  if (error) return <div>Error</div>
  return (
    <div className="min-h-screen border-l border-r border-opacity-80">
      <PageNav title="Profile" subtitle={`@${userFullDetails.username}`} />
      <main className="flex flex-col mt-4">
        <ProfileCard userFullDetails={userFullDetails} />

        <section className="mt-4">
          <nav className="border-t border-b border-opacity-80">
            <ul className="flex items-center justify-around h-10">
              <li
                className={`flex items-center justify-center flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-blue-50 border-opacity-80 ${
                  active === 'all' ? 'border-b-2 border-indigo-400' : ''
                }`}
              >
                <Link
                  className="flex items-center justify-center w-full h-full"
                  to={paths.profile({ username: userFullDetails.username })}
                >
                  Your Posts
                </Link>
              </li>
              <li
                className={`flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-indigo-50 border-opacity-80 ${
                  active === 'liked' ? 'border-b-2 border-indigo-400' : ''
                }`}
              >
                <Link
                  className="flex items-center justify-center w-full h-full"
                  to={paths.profile({ username: userFullDetails.username, query: { like: true } })}
                >
                  Liked
                </Link>
              </li>
              <li
                className={`flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-indigo-50 border-opacity-80 ${
                  active === 'saved' ? 'border-b-2 border-indigo-400' : ''
                }`}
              >
                <Link
                  className="flex items-center justify-center w-full h-full"
                  to={paths.profile({ username: userFullDetails.username, query: { save: true } })}
                >
                  Saved
                </Link>
              </li>
            </ul>
          </nav>
        </section>
        <section className="mb-4">
          {loading ? (
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

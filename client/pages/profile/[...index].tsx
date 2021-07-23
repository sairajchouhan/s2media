import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from '../../components/Link'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { ProfileCard } from '../../components/molecules/Profile'
import { Post } from '../../components/organisms/Post'
import PrivateRoute from '../../components/PrivateRoute'
import { useUser } from '../../hooks/useUser'
import { PostWithUserAndProfile } from '../../types/post'
import { UserFullDetails } from '../../types/user'
import { paths } from '../../utils/paths'

const Profile = () => {
  const user = useUser()

  const { data: userFullDetails, isLoading, isError } = useQuery<UserFullDetails>(
    ['profile', user?.username],
    async () => {
      const res = await axios.get('http://localhost:5000/api/v1/user/me', {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      })
      return res.data
    }
  )

  const { data: userPosts } = useQuery(['user', 'posts', user?.id], async () => {
    const res = await axios.get(`http://localhost:5000/api/v1/user/${user?.id}/posts`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
    return res.data
  })

  console.log(userPosts)

  if (!user || !userFullDetails) return null
  if (isError) return <h1>Something went wrong, Try again</h1>
  if (isLoading) return <h1>Loading...</h1>

  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Profile" subtitle={`@${userFullDetails.username}`} />
        <main className="flex flex-col mt-4">
          <ProfileCard userFullDetails={userFullDetails} />

          <section className="mt-4">
            <nav className="border-t border-b border-opacity-80">
              <ul className="flex items-center justify-around h-10">
                <li className="flex items-center justify-center flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-indigo-50 border-opacity-80">
                  <Link
                    className="flex items-center justify-center w-full h-full"
                    to={paths.profile({ username: userFullDetails.username })}
                  >
                    Your Posts
                  </Link>
                </li>
                <li className="flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-indigo-50 border-opacity-80">
                  <Link
                    className="flex items-center justify-center w-full h-full"
                    to={paths.profile({ username: 'someuser' })}
                  >
                    Liked
                  </Link>
                </li>
                <li className="flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-indigo-50 border-opacity-80">
                  <Link
                    className="flex items-center justify-center w-full h-full"
                    to={paths.profile({ username: 'someuser' })}
                  >
                    Saved
                  </Link>
                </li>
              </ul>
            </nav>
          </section>
          <section>
            {userPosts &&
              userPosts.map((post: PostWithUserAndProfile) => <Post key={post.id} post={post} />)}
          </section>
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Profile

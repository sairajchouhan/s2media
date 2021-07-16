import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from '../../components/Link'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { ProfileCard } from '../../components/molecules/Profile'
import PrivateRoute from '../../components/PrivateRoute'
import { useUser } from '../../hooks/useUser'
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

  console.log(userFullDetails)

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
                <li className="flex items-center justify-center flex-1 h-full text-center bg-gray-200 border-r cursor-pointer border-opacity-80">
                  <Link to={paths.profile({ username: userFullDetails.username })}>Your Posts</Link>
                </li>
                <li className="flex items-center justify-center flex-1 h-full text-center bg-gray-200 border-r cursor-pointer border-opacity-80">
                  <Link to={paths.profile({ username: 'someuser' })}>Not Your Posts</Link>
                </li>
              </ul>
            </nav>
          </section>
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Profile

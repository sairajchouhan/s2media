import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { Avatar } from '../../components/atoms/Avatar'
import { PageNav } from '../../components/molecules/Page/page-nav'
import PrivateRoute from '../../components/PrivateRoute'
import { useUser } from '../../hooks/useUser'
import { UserWithProfile } from '../../types/user'

const Profile = () => {
  const user = useUser()

  const { data: userFullDetails, isLoading, isError } = useQuery<UserWithProfile>(
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
        <main className="flex flex-col px-2 mt-4">
          <div className="flex">
            <div className="flex-shrink">
              <Avatar src={userFullDetails.avatar} alt="user profile avatar" w="w-40" />
            </div>
            <div className="flex-1 p-2 ml-5 space-y-1">
              <div>
                <div className="flex items-center justify-between ">
                  <h1 className="text-xl font-bold">{userFullDetails.profile.displayName}</h1>
                  <button className="px-2 py-1 text-sm border rounded-md bg-gray-50">
                    Edit Profile
                  </button>
                </div>
                <h3 className="text-gray-500">@{user.username}</h3>
              </div>
              <div className="flex items-center justify-between">
                <p>5434 posts</p>
                <p>{userFullDetails.followers.length} followers</p>
                <p>{userFullDetails.following.length} following</p>
              </div>
              <div>{userFullDetails.profile.bio && <p>{userFullDetails.profile.bio}</p>}</div>
            </div>
          </div>
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Profile

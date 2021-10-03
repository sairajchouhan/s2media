import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { GET_USER_FOLLOWERS } from '../../../utils/querykeysAndPaths'
import { Avatar } from '../../atoms/Avatar'
import { CircleLoader } from '../../atoms/CircleLoader'
import { Model } from '../Model'

interface IProfileCardStatsProps {
  type: 'followers' | 'following' | 'posts'
  count: number
  profileUserUsername: string
  canViewFullProfile: boolean
}

export const ProfileCardStats = ({
  profileUserUsername,
  type,
  count,
  canViewFullProfile,
}: IProfileCardStatsProps) => {
  const { getIdToken } = useAuth()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleShowDetailedTypeInfo = async () => {
    toggleOpen()
  }

  const { data, isLoading, isError } = useQuery(
    GET_USER_FOLLOWERS.queryKey(profileUserUsername),
    async () => {
      const { data } = await axios.get(`/user/${profileUserUsername}/${type}`, {
        headers: {
          Authorization: `Bearer ${await getIdToken()}`,
        },
      })
      return data
    },
    {
      enabled: open,
    }
  )

  const toggleOpen = () => {
    setOpen((open) => !open)
  }

  return (
    <>
      <div
        className={`${count > 0 && type !== 'posts' && canViewFullProfile ? 'cursor-pointer' : ''}`}
        onClick={
          count > 0 && type !== 'posts' && canViewFullProfile
            ? handleShowDetailedTypeInfo
            : undefined
        }
      >
        <p>
          <span className={`text-lg font-medium`}>{count}</span> {type}
        </p>
      </div>
      {open ? (
        <Model open={open} toggleOpen={toggleOpen}>
          <Model.Head toggleOpen={toggleOpen} title={type} />
          <Model.Body>
            {isError ? (
              <div>Something went wrong</div>
            ) : isLoading ? (
              <CircleLoader className="py-10" />
            ) : data && data[type]?.length > 0 ? (
              data[type].map((followerOrIng: any) => (
                <div
                  key={followerOrIng.id}
                  className="px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    toggleOpen()
                    router.push(`/profile/${followerOrIng.username}`)
                  }}
                >
                  <div className="flex items-center">
                    <Avatar
                      src={followerOrIng.avatar}
                      w="w-10"
                      h="h-10"
                      alt={`${profileUserUsername}'s profile image'`}
                    />
                    <p className="ml-4">{followerOrIng.username}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>No {type}</div>
            )}
          </Model.Body>
        </Model>
      ) : null}
    </>
  )
}

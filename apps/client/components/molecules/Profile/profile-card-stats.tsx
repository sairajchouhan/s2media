import React from 'react'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'

interface IProfileCardStatsProps {
  type: 'followers' | 'following' | 'posts'
  count: number
  profileUserUsername: string
}

export const ProfileCardStats = ({ profileUserUsername, type, count }: IProfileCardStatsProps) => {
  const { getIdToken } = useAuth()
  const handleShowDetailedTypeInfo = async () => {
    const { data } = await axios.get(`/user/${profileUserUsername}/followers`, {
      headers: {
        Authorization: `Bearer ${await getIdToken()}`,
      },
    })
    console.log(data)
  }

  return (
    <div
      className={`${count > 0 && type !== 'posts' ? 'cursor-pointer' : ''}`}
      onClick={count > 0 && type !== 'posts' ? handleShowDetailedTypeInfo : undefined}
    >
      <p>
        <span className={`text-lg font-medium`}>{count}</span> {type}
      </p>
    </div>
  )
}

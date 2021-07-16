import React, { useState } from 'react'
import { UserFullDetails } from '../../../types/user'
import { Avatar } from '../../atoms/Avatar/avatar'
import { Button } from '../../atoms/Button'
import { EditProfile } from '../../organisms/EditProfile'

export interface ProfileCardProps {
  userFullDetails: UserFullDetails
}

export const ProfileCard = ({ userFullDetails }: ProfileCardProps) => {
  const [open, setOpen] = useState(false)

  // write a toggle open function
  const toggleOpen = () => {
    setOpen((open) => !open)
  }

  return (
    <div className="flex px-2">
      <div className="flex-shrink block">
        <Avatar src={userFullDetails.avatar} alt="user profile avatar" w="w-40" h="h-40" />
      </div>
      <div className="flex-1 p-2 ml-5 space-y-1">
        <div>
          <div className="flex items-center justify-between ">
            <h1 className="text-xl font-bold">{userFullDetails.profile.displayName}</h1>
            <Button variant="outline" colorScheme="gray" onClick={toggleOpen}>
              Edit Profile
            </Button>
            <EditProfile userFullDetails={userFullDetails} open={open} setOpen={setOpen} />
          </div>
          <h3 className="text-gray-500">@{userFullDetails.username}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>{userFullDetails.post.length} posts</p>
          <p>{userFullDetails.followers.length} followers</p>
          <p>{userFullDetails.following.length} following</p>
        </div>
        <div>{userFullDetails.profile.bio && <p>{userFullDetails.profile.bio}</p>}</div>
      </div>
    </div>
  )
}

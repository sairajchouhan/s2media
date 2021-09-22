import Image from 'next/image'
import { useState } from 'react'
import { useAuth } from '../../../context/authContext'
import { AuthUser } from '../../../types/'
import DummyUser from '../../atoms/Avatar/dummyUser.svg'
import { Button } from '../../atoms/Button'
import { EditProfile } from '../../organisms/EditProfile'

export interface ProfileCardProps {
  profileUser: AuthUser
}

export const ProfileCard = ({ profileUser }: ProfileCardProps) => {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen((open) => !open)
  }

  return (
    <div className="flex flex-wrap px-2 py-2">
      <div className="flex-shrink block mx-auto">
        <Image
          src={profileUser.avatar ?? DummyUser}
          alt={profileUser.username}
          className="rounded-full"
          width="150"
          height="150"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      <div className="flex-1 p-2 ml-5 space-y-2">
        <div>
          <div className="flex items-center justify-between ">
            <h1 className="text-xl font-bold">{profileUser.profile.displayName}</h1>
            {user?.username === profileUser.username ? (
              <Button variant="outline" colorScheme="gray" onClick={toggleOpen}>
                Edit Profile
              </Button>
            ) : (
              <div>Sucker</div>
            )}
            <EditProfile profileUser={profileUser} open={open} setOpen={setOpen} />
          </div>
          <h3 className="text-gray-500">@{profileUser.username}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>{profileUser._count.post} posts</p>
          <p>{profileUser._count.followers} followers</p>
          <p>{profileUser._count.following} following</p>
        </div>
        <div>
          {profileUser.profile.bio &&
            profileUser.profile.bio
              .split(',')
              .map((para) => <p key={para.length * Math.random()}>{para}</p>)}
        </div>
      </div>
    </div>
  )
}

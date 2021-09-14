import { useState } from 'react'
import { AuthUser } from '../../../types/user'
import { Avatar } from '../../atoms/Avatar/avatar'
import { Button } from '../../atoms/Button'
import { EditProfile } from '../../organisms/EditProfile'

export interface ProfileCardProps {
  user: AuthUser
}

export const ProfileCard = ({ user }: ProfileCardProps) => {
  const [open, setOpen] = useState(false)

  // write a toggle open function
  const toggleOpen = () => {
    setOpen((open) => !open)
  }

  return (
    <div className="flex flex-wrap px-2 py-2">
      <div className="flex-shrink block mx-auto">
        <Avatar src={user.avatar} alt="user profile avatar" w="w-40" h="h-40" />
      </div>
      <div className="flex-1 p-2 ml-5 space-y-2">
        <div>
          <div className="flex items-center justify-between ">
            <h1 className="text-xl font-bold">{user.profile.displayName}</h1>
            <Button variant="outline" colorScheme="gray" onClick={toggleOpen}>
              Edit Profile
            </Button>
            <EditProfile user={user} open={open} setOpen={setOpen} />
          </div>
          <h3 className="text-gray-500">@{user.username}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p>{user._count.post} posts</p>
          <p>{user._count.followers} followers</p>
          <p>{user._count.following} following</p>
        </div>
        <div>{user.profile.bio && <p>{user.profile.bio}</p>}</div>
      </div>
    </div>
  )
}

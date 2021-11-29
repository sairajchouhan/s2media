import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { BaseUser } from '../../../types'
import { Button } from '../../atoms/Button'

export const ProfileCardAction = ({ profileUser, toggleOpen }: { profileUser: BaseUser; toggleOpen: () => void }) => {
  const { rqUser, getIdToken } = useAuth()
  const [userFollowed, setUserFollowed] = useState<boolean | undefined>()

  useEffect(() => {
    if (rqUser && profileUser) {
      const value = rqUser?.following.filter((following: any) => following.followedId === profileUser.uid).length > 0
      setUserFollowed(value)
    }
  }, [profileUser, rqUser])

  const followUserMutation = useMutation(
    async (toBeFollowedUserId: string) => {
      const token = await getIdToken()
      return axios.post(
        `/user/follow/${toBeFollowedUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
    {
      onMutate: () => {
        const currentUserFollowed = userFollowed
        return { currentUserFollowed }
      },
      onError: (err, vars, context) => {
        context?.currentUserFollowed
        if (err) {
          setUserFollowed(context?.currentUserFollowed)
        }
      },
      onSuccess: (data, vars, context) => {
        if (data) {
          setUserFollowed(!context?.currentUserFollowed)
        }
      },
    }
  )

  const handleFollowUser = () => {
    followUserMutation.mutate(profileUser.uid)
  }

  return rqUser?.uid === profileUser.uid ? (
    <Button variant="outline" colorScheme="gray" onClick={toggleOpen}>
      Edit Profile
    </Button>
  ) : (
    <div>
      {userFollowed ? (
        <Button variant="outline" onClick={handleFollowUser}>
          Following
        </Button>
      ) : (
        <Button variant="outline" onClick={handleFollowUser}>
          Follow
        </Button>
      )}
    </div>
  )
}

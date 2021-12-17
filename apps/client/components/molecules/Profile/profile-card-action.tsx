import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { BaseUser } from '../../../types'
import { GET_PROFILE_USER } from '../../../utils/querykeysAndPaths'
import { Button } from '../../atoms/Button'

export const ProfileCardAction = ({
  profileUser,
  toggleOpen,
}: {
  profileUser: BaseUser
  toggleOpen: () => void
}) => {
  const { rqUser, getIdToken } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [userFollowed, setUserFollowed] = useState<boolean | undefined>(() => {
    if (!rqUser || !profileUser) return
    return rqUser?.following.some((following: any) => following.followedId === profileUser.uid)
  })

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
      onError: (err, _vars, context) => {
        context?.currentUserFollowed
        if (err) {
          setUserFollowed(context?.currentUserFollowed)
        }
      },
      onSuccess: async (data, vars, context) => {
        if (data) {
          const res = await queryClient.invalidateQueries(
            GET_PROFILE_USER.queryKey((router as any).query.index[0])
          )
          setUserFollowed(!context?.currentUserFollowed)
          console.log(res)
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

/* eslint-disable no-unused-vars */
import React from 'react'
import { axios } from '../../../config/axios'
import { useUser } from '../../../hooks/useUser'
import { LeftNavIconProps } from '../../../types/icon'
import { PostWithUserAndProfile } from '../../../types/post'
import { IconButton } from '../../atoms/IconButton'

export interface PostFootInterface {
  icon1: (props: LeftNavIconProps) => JSX.Element
  icon2?: typeof React.Component
  icon3?: typeof React.Component
  post: PostWithUserAndProfile
}

export const PostFoot = ({ icon1, icon2, icon3, post }: PostFootInterface) => {
  const user = useUser()
  // console.log(post)
  const handleLikePost = async () => {
    // /post/like/:postId  POST
    const { data } = await axios.post(
      `/post/like/${post.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    )
    // console.log(data)
  }

  // console.log(post.like.userId === user?.id ? 'solid' : 'outline')

  const getVariant = (type: 'like') => {
    const likes: Array<any> = post[type]
    const liked = likes.find((like: any) => like.userId === user?.id)
    if (liked) return 'solid'
    else return 'outline'
  }

  console.log(getVariant('like'))

  if (!user) return null

  return (
    <div className="px-3 py-2 ">
      <div className="flex items-center justify-between">
        <div className="flex">
          <IconButton
            w="w-6"
            h="h-6"
            textColour="text-red-600"
            hoverBgColor="bg-red-100"
            icon={icon1}
            variant={getVariant('like')}
            onClick={handleLikePost}
          />
          {/* <IconButton w="w-6" h="h-6" icon={icon2} /> */}
        </div>
        <div>{/* <IconButton icon={icon3} w="w-6" h="h-6" /> */}</div>
      </div>
      <div className="flex items-center">
        <p className="text-sm text-gray-600">
          <span>{post._count?.like} likes</span>
        </p>
        <span className="w-1 h-1 mx-2 mt-1 bg-gray-400 rounded-full"></span>
        <p className="text-sm text-gray-600">
          <span>{post._count?.comment}</span> comments
        </p>
      </div>
    </div>
  )
}

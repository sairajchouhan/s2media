/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { IconComp } from '../../../types/icon'
import { PostWithUserAndProfile } from '../../../types/post'
import { IconButton } from '../../atoms/IconButton'

export interface PostFootInterface {
  icon1: IconComp
  icon2?: IconComp
  icon3?: IconComp
  post: PostWithUserAndProfile
}

export const PostFoot = ({ icon1, icon2, icon3, post }: PostFootInterface) => {
  const { user } = useAuth()
  const [likeCount, setLikeCount] = useState<number>(post.like.length)
  const [userLiked, setUserLiked] = useState<boolean>(
    post.like.some((like: any) => like.userId === user?.id)
  )

  const handleLikePost = async () => {
    const currentLikes = likeCount
    if (userLiked) {
      setUserLiked(false)
      setLikeCount((like) => like - 1)
    }
    if (!userLiked) {
      setUserLiked(true)
      setLikeCount((like) => like + 1)
    }
    try {
      await axios.post(
        `/post/like/${post.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      )
    } catch (err) {
      setLikeCount(currentLikes)
      setUserLiked((state) => !state)
      console.error(err)
    }
    // console.log(data)
  }

  // console.log(post.like.userId === user?.id ? 'solid' : 'outline')

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
            variant={userLiked ? 'solid' : 'outline'}
            onClick={handleLikePost}
          />
          {/* <IconButton w="w-6" h="h-6" icon={icon2} /> */}
        </div>
        <div>{/* <IconButton icon={icon3} w="w-6" h="h-6" /> */}</div>
      </div>
      <div className="flex items-center">
        <p className="text-sm text-gray-600">
          <span>{likeCount} likes</span>
        </p>
        <span className="w-1 h-1 mx-2 mt-1 bg-gray-400 rounded-full"></span>
        <p className="text-sm text-gray-600">
          <span>{post._count?.comment}</span> comments
        </p>
      </div>
    </div>
  )
}

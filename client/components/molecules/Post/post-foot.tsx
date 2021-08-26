/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { PostWithBaseUser } from '../../../types/post'
import { IconButton } from '../../atoms/IconButton'
import { HeartIcon, SavedIcon } from '../../icons'

export interface PostFootInterface {
  post: PostWithBaseUser
}

export const PostFoot = ({ post }: PostFootInterface) => {
  const { user } = useAuth()
  const [likeCount, setLikeCount] = useState<number>(post.like.length)
  const [userLiked, setUserLiked] = useState<boolean>(
    post.like.some((like: any) => like.userId === user?.uid)
  )
  const [userSaved, setUserSaved] = useState<boolean>(
    post.save.some((save: any) => save.userId === user?.uid)
  )

  if (!user) return null

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
            Authorization: `Bearer ${user.idToken}`,
          },
        }
      )
    } catch (err) {
      setLikeCount(currentLikes)
      setUserLiked((state) => !state)
      console.error(err)
    }
  }
  const handleSavePost = async () => {
    if (userSaved) {
      setUserSaved(false)
    }
    if (!userSaved) {
      setUserSaved(true)
    }
    try {
      await axios.post(
        `/post/save/${post.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
          },
        }
      )
    } catch (err) {
      setUserSaved((state) => !state)
      console.error(err)
    }
  }

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
            icon={HeartIcon}
            variant={userLiked ? 'solid' : 'outline'}
            onClick={handleLikePost}
          />
          {/* <IconButton w="w-6" h="h-6" icon={icon2} /> */}
        </div>
        <div>
          <IconButton
            w="w-6"
            h="h-6"
            textColour="text-gray-600"
            hoverBgColor="bg-gray-100"
            icon={SavedIcon}
            variant={userSaved ? 'solid' : 'outline'}
            onClick={handleSavePost}
          />
        </div>
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

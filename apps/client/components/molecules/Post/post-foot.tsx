import { useRouter } from 'next/router'
import { useState } from 'react'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { PostWithBaseUser } from '../../../types/post'
import { IconButton } from '../../atoms/IconButton'
import { CommentIcon, HeartIcon, SavedIcon } from '../../icons'
import PostFootLikeCommentCount from './post-foot-like-comment-count'

export interface PostFootInterface {
  post: PostWithBaseUser
}

export const PostFoot = ({ post }: PostFootInterface) => {
  const router = useRouter()
  const { rqUser, getIdToken, refetchRqUser } = useAuth()
  const [likeCount, setLikeCount] = useState<number>(post.like.length)
  const [userLiked, setUserLiked] = useState<boolean>(
    post.like.some((like: any) => like.userId === rqUser?.uid)
  )

  const [userSaved, setUserSaved] = useState<boolean>(
    rqUser.save.some((save: any) => save.postId === post.id)
  )

  if (!rqUser) return null

  const handleLikePost = async () => {
    const token = await getIdToken()
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
            Authorization: `Bearer ${token}`,
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
    const token = await getIdToken()
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
            Authorization: `Bearer ${token}`,
          },
        }
      )
      refetchRqUser()
    } catch (err) {
      setUserSaved((state) => !state)
      console.error(err)
    }
  }

  if (!rqUser) return null

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center transform -translate-x-2">
          <IconButton
            w="w-6"
            h="h-6"
            textColour="text-red-600"
            hoverBgColor="bg-red-100"
            icon={HeartIcon}
            variant={userLiked ? 'solid' : 'outline'}
            onClick={handleLikePost}
          />
          <IconButton
            w="w-6"
            h="h-6"
            textColour="text-gray-600"
            hoverBgColor="bg-gray-100"
            icon={CommentIcon}
            onClick={() => {
              router.pathname === '/home' || router.pathname.startsWith('/profile')
                ? router.push(`/post/${post.id}`)
                : null
            }}
          />
        </div>
        <div className="flex items-center justify-center transform translate-x-2">
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
        <PostFootLikeCommentCount
          showModel={post.like.length > 0}
          data={post.like}
          type="likes"
          count={likeCount}
        />
        <span className="w-1 h-1 mx-2 mt-1 bg-gray-400 rounded-full"></span>
        <PostFootLikeCommentCount
          showModel={false}
          type="comments"
          count={post._count?.comment + post._count?.reply}
        />
      </div>
    </div>
  )
}

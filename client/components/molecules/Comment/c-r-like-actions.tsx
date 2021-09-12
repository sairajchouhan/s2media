import { useState } from 'react'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'

const CommentReplyLikeAction = ({ isReply, crEntity }: { isReply: boolean; crEntity: any }) => {
  const { user, getIdToken } = useAuth()
  const [crLikeCount, setCrLikeCount] = useState<number>(() => crEntity?._count?.like ?? 0)
  const [userLiked, setUserLiked] = useState<boolean>(
    crEntity?.like?.some((like: any) => like.userId === user?.uid) ?? false
  )

  const handleCommentLike = async () => {
    const currentLikes = crLikeCount
    if (userLiked) {
      setUserLiked(false)
      setCrLikeCount((like) => like - 1)
    }
    if (!userLiked) {
      setUserLiked(true)
      setCrLikeCount((like) => like + 1)
    }
    try {
      const idToken = await getIdToken()
      await axios.post(
        `/post/comment/like/${crEntity.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      )
    } catch (err) {
      setCrLikeCount(currentLikes)
      setUserLiked((state) => !state)
      console.error(err)
    }
  }

  const handleReplyLike = async () => {
    const currentLikes = crLikeCount
    if (userLiked) {
      setUserLiked(false)
      setCrLikeCount((like) => like - 1)
    }
    if (!userLiked) {
      setUserLiked(true)
      setCrLikeCount((like) => like + 1)
    }
    try {
      const idToken = await getIdToken()
      await axios.post(
        `/post/reply/like/${crEntity.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      )
    } catch (err) {
      setCrLikeCount(currentLikes)
      setUserLiked((state) => !state)
      console.error(err)
    }
  }

  return (
    <>
      <button
        className="rounded cursor-pointer p-0.5 hover:bg-gray-100"
        onClick={() => (isReply ? handleReplyLike() : handleCommentLike())}
      >
        <span className={userLiked ? 'text-red-500' : 'text-gray-500'}>Like</span>
      </button>
      <span className="p-0.5 text-gray-500">- {crLikeCount} Likes</span>
    </>
  )
}

export default CommentReplyLikeAction

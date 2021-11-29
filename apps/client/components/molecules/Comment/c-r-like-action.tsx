import { useState } from 'react'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { CREATE_COMMENT_LIKE, CREATE_REPLY_LIKE } from '../../../utils/querykeysAndPaths'

const CommentReplyLikeAction = ({ isReply, crEntity }: { isReply: boolean; crEntity: any }) => {
  const { rqUser, getIdToken } = useAuth()
  const [crLikeCount, setCrLikeCount] = useState<number>(() => crEntity?._count?.like ?? 0)
  const [userLiked, setUserLiked] = useState<boolean>(
    crEntity?.like?.some((like: any) => like.userId === rqUser?.uid) ?? false
  )

  const handleCommentReplyLike = async () => {
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
        isReply
          ? CREATE_REPLY_LIKE.path(crEntity.postId, crEntity.id)
          : CREATE_COMMENT_LIKE.path(crEntity.postId, crEntity.id),
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
      <button className="rounded cursor-pointer p-0.5 hover:bg-gray-100" onClick={handleCommentReplyLike}>
        <span className={userLiked ? 'text-red-500' : 'text-gray-500'}>Like</span>
      </button>
      {crEntity?.like && crEntity?.like.length > 0 ? (
        <span className="p-0.5 text-gray-500">- {crLikeCount} Likes</span>
      ) : null}
    </>
  )
}

export default CommentReplyLikeAction

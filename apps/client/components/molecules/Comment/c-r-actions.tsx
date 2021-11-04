import { useEffect, useRef, useState } from 'react'
import { useQueryClient } from 'react-query'
import { GET_REPLIES_FOR_COMMENT } from '../../../utils/querykeysAndPaths'
import { CommentReplyInput } from './c-r-input'
import CommentReplyLikeAction from './c-r-like-action'

export const CommentReplyAction = ({
  crEntity,
  commentId,
  postId,
  replyCount,
  isReply,
  fetchNextPage,
  refetchIfNoReplies,
}: {
  crEntity: any
  commentId: string
  postId: string
  replyCount?: number
  isReply: boolean
  fetchNextPage?: any
  refetchIfNoReplies: any
}) => {
  const [reply, setReply] = useState({ show: false, replyText: '' })
  const queryClient = useQueryClient()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleShowReplies = async () => {
    const previousCommentReplies = queryClient.getQueryData(GET_REPLIES_FOR_COMMENT.queryKey(commentId))
    if (!previousCommentReplies) {
      fetchNextPage()
    }
  }

  useEffect(() => {
    if (reply.show && inputRef.current) {
      inputRef.current.focus()
    }
  }, [reply.show])

  return (
    <div className="mt-0.5">
      <div className="flex justify-between">
        <div className="flex space-x-2 text-xs">
          <div className="flex items-center">
            <CommentReplyLikeAction isReply={isReply} crEntity={crEntity} />
          </div>
          <span className="text-gray-500">|</span>
          <div className="flex items-center text-gray-500">
            <button
              onClick={() => {
                setReply((reply) => ({ ...reply, show: !reply.show }))
              }}
              className="p-0.5 rounded cursor-pointer hover:bg-gray-100 "
            >
              Reply
            </button>
            {!isReply && replyCount && replyCount > 0 ? (
              <span className="p-0.5">{`- ${replyCount} Replies`}</span>
            ) : null}
          </div>
        </div>
        {!isReply && replyCount && replyCount > 0 ? (
          <div>
            <p
              onClick={() => handleShowReplies()}
              className="cursor-pointer text-xs text-indigo-500 hover:bg-blue-50 p-0.5 rounded"
            >
              Show Replies
            </p>
          </div>
        ) : null}
      </div>
      {reply.show ? (
        <div>
          <CommentReplyInput
            ref={inputRef}
            isReply={true}
            setReply={setReply}
            postId={postId}
            commentId={commentId}
            repliedToUser={crEntity.user}
            refetchIfNoReplies={refetchIfNoReplies}
          />
        </div>
      ) : null}
    </div>
  )
}

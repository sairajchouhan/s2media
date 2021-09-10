import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { CommentReplyInput } from './c-r-input'

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

  const handleShowReplies = async () => {
    const previousCommentReplies = queryClient.getQueryData(['reply', { commentId }])
    if (!previousCommentReplies) {
      fetchNextPage()
    }
  }

  return (
    <div className="mt-0.5">
      <div className="flex justify-between">
        <div className="flex space-x-2 text-xs text-gray-500">
          <div className="flex items-center">
            <button className="rounded cursor-pointer p-0.5 hover:bg-gray-100">Like</button>
            <span className="p-0.5"> - 4 Likes</span>
          </div>
          <span>|</span>
          <div className="flex items-center">
            <button
              onClick={() => setReply((reply) => ({ ...reply, show: !reply.show }))}
              className="p-0.5 rounded cursor-pointer hover:bg-gray-100"
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

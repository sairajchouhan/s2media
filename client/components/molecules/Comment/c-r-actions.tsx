import React, { useState } from 'react'
import { CommentReplyInput } from './c-r-input'

export const CommentReplyAction = ({
  crEntity,
  commentId,
  postId,
  replyCount,
  isReply,
}: {
  crEntity: any
  commentId: string
  postId: string
  replyCount?: number
  isReply: boolean
}) => {
  const [reply, setReply] = useState({ show: false, replyText: '' })
  return (
    <div className="mt-0.5">
      <div className="flex space-x-2 text-xs text-gray-500">
        <p className="cursor-pointer hover:bg-gray-100 p-0.5 rounded">Like</p>
        <span>|</span>
        <p
          onClick={() => setReply((reply) => ({ ...reply, show: !reply.show }))}
          className="cursor-pointer hover:bg-gray-100 p-0.5 rounded"
        >
          Reply {!isReply ? `- ${replyCount} Replies` : ''}
        </p>
      </div>
      {reply.show ? (
        <div>
          <CommentReplyInput
            isReply={true}
            setReply={setReply}
            postId={postId}
            commentId={commentId}
            repliedToUser={crEntity.user}
          />
        </div>
      ) : null}
    </div>
  )
}

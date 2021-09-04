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
  hasNextPage,
}: {
  crEntity: any
  commentId: string
  postId: string
  replyCount?: number
  isReply: boolean
  fetchNextPage?: any
  hasNextPage?: boolean | undefined
}) => {
  const [reply, setReply] = useState({ show: false, replyText: '' })
  const queryClient = useQueryClient()

  const handleShowReplies = async (checked: boolean) => {
    const previousReplies = queryClient.getQueryData<any>([
      'post',
      { id: postId, commentId: commentId, reply: true },
    ])
    if (!previousReplies && checked) {
      console.log('I will get replies for first time')
      fetchNextPage()
    }
    if (previousReplies && hasNextPage && checked) {
      console.log('I will get more replies')
    }
  }

  return (
    <div className="mt-0.5">
      <div className="flex justify-between">
        <div className="flex space-x-2 text-xs text-gray-500">
          <p className="cursor-pointer hover:bg-gray-100 p-0.5 rounded">Like</p>
          <span>|</span>
          <p
            onClick={() => setReply((reply) => ({ ...reply, show: !reply.show }))}
            className="cursor-pointer hover:bg-gray-100 p-0.5 rounded"
          >
            Reply {!isReply && replyCount && replyCount > 0 ? `- ${replyCount} Replies` : ''}
          </p>
        </div>
        {!isReply && replyCount && replyCount > 0 ? (
          <div>
            <label htmlFor="showHideReply">
              <p className="cursor-pointer text-xs text-indigo-500 hover:bg-blue-100 p-0.5 rounded">
                Show Replies
              </p>
            </label>
            <input
              type="checkbox"
              onChange={(e) => {
                const checked = e.target.checked
                handleShowReplies(checked)
                console.log(checked)
              }}
              id="showHideReply"
              className="hidden"
            />
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
          />
        </div>
      ) : null}
    </div>
  )
}

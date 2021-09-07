import React from 'react'
import { useInfiniteQuery } from 'react-query'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { paths } from '../../../utils/paths'
import { Avatar } from '../../atoms/Avatar'
import { Link } from '../../Link'
import { CommentReplyAction } from './c-r-actions'
import { CommentReplyText } from './c-r-text'

export const Comment = ({ comment }: { comment: any }) => {
  const { user } = useAuth()
  const {
    data: replyData,
    isIdle,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['reply', { commentId: comment.id }],
    async ({ pageParam = '' }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const { data } = await axios.get(
        `/post/comment/reply/${comment.postId}/${comment.id}?cursor=${pageParam}`,
        {
          headers: {
            Authorization: `Bearer ${user?.idToken}`,
          },
        }
      )
      return data
    },
    {
      enabled: false,
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor ?? false
      },
      retry: false,
    }
  )

  return (
    <div className="my-3">
      <div className="flex items-start ">
        <Link to={paths.profile({ username: comment.user.username })}>
          <Avatar src={comment.user.avatar} w="w-10" h="h-10" alt="user profile image" />
        </Link>
        <div className="flex-1">
          <CommentReplyText crEntity={comment} isReply={false} />
          <CommentReplyAction
            isReply={false}
            replyCount={comment._count.reply}
            commentId={comment.id}
            postId={comment.postId}
            crEntity={comment}
            fetchNextPage={fetchNextPage}
          />

          {replyData &&
            replyData.pages.map((page: any) => (
              <React.Fragment key={page.nextCursor || `${comment.id}`}>
                {page.reply.map((reply: any) => (
                  <div className="flex items-start mt-3" key={reply.id}>
                    <Link to={paths.profile({ username: reply.user.username })}>
                      <Avatar src={reply.user.avatar} w="w-10" h="h-10" alt="user profile image" />
                    </Link>
                    <div className="flex-1">
                      <CommentReplyText crEntity={reply} isReply={true} />
                      <CommentReplyAction
                        isReply={true}
                        commentId={comment.id}
                        postId={comment.postId}
                        crEntity={reply}
                      />
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}

          {isFetchingNextPage && <div className="text-center">Loading...</div>}
          {!isFetchingNextPage && replyData?.pages.length ? (
            (isIdle && comment._count.reply > 0) || hasNextPage ? (
              <>
                <button
                  onClick={() => fetchNextPage()}
                  className="text-sm text-gray-500 cursor-pointer hover:underline"
                >
                  show more replies
                </button>
              </>
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  )
}

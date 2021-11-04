import cuid from 'cuid'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import {
  GET_COMMENTS_FOR_POST,
  GET_ONE_POST,
  GET_REPLIES_FOR_COMMENT,
  POST_COMMENT,
  POST_REPLY,
} from '../../../utils/querykeysAndPaths'
import { Input } from '../../atoms/Input/Input'

interface Iprops {
  postId: string
  commentId?: string
  isReply: boolean
  repliedToUser?: any
  refetchIfNoReplies?: any
  setReply?: React.Dispatch<
    React.SetStateAction<{
      show: boolean
      replyText: string
    }>
  >
}

export const CommentReplyInput = React.forwardRef<HTMLInputElement, Iprops>(
  ({ postId, commentId, isReply, repliedToUser, setReply, refetchIfNoReplies }, ref) => {
    const queryClient = useQueryClient()
    const { user } = useAuth()
    const [inputText, setInputText] = useState('')

    const commentMutation = useMutation(
      (inputText: string) => {
        return axios.post(
          POST_COMMENT.path(postId),
          { commentText: inputText },
          {
            headers: {
              Authorization: `Bearer ${user?.idToken}`,
            },
          }
        )
      },
      {
        onMutate: async (inputText: string) => {
          await queryClient.cancelQueries(GET_COMMENTS_FOR_POST.queryKey(postId))
          await queryClient.cancelQueries(GET_ONE_POST.queryKey(postId))

          const previousComments = queryClient.getQueryData<any>(['post', { id: postId, comment: true }])
          console.log(previousComments)
          const previousPost: any = queryClient.getQueryData(GET_ONE_POST.queryKey(postId))
          console.log(previousPost)

          const newComment = {
            id: cuid(),
            commentText: inputText,
            userId: user?.uid,
            postId: postId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: {
              uid: user?.uid,
              avatar: user?.avatar,
              username: user?.username,
              profile: {
                displayName: user?.profile.displayName,
              },
            },
            _count: {
              reply: 0,
              like: 0,
            },
            reply: [],
          }

          if (previousComments) {
            const newCommentsData = previousComments
            newCommentsData.pages[0].comment.unshift(newComment)

            queryClient.setQueryData(GET_COMMENTS_FOR_POST.queryKey(postId), newCommentsData)

            queryClient.setQueryData(GET_ONE_POST.queryKey(postId), {
              ...previousPost,
              _count: {
                ...previousPost._count,
                comment: previousPost._count.comment + 1,
              },
            })
          }
          setInputText('')
          return { previousComments, previousPost }
        },
        onError: (_err, _vars, context) => {
          if (context?.previousComments) {
            queryClient.setQueryData<any>(GET_COMMENTS_FOR_POST.queryKey(postId), context.previousComments)
          }
          if (context?.previousPost) {
            queryClient.setQueryData<any>(GET_ONE_POST.queryKey(postId), context.previousPost)
          }
        },
        onSuccess: () => {},
        onSettled: () => {
          queryClient.invalidateQueries(GET_COMMENTS_FOR_POST.queryKey(postId))
        },
      }
    )

    const replyMutation = useMutation(
      (inputText: string) => {
        return axios.post(
          POST_REPLY.path(postId, commentId),
          { replyText: inputText, repliedToUserUid: repliedToUser.uid },
          {
            headers: {
              Authorization: `Bearer ${user?.idToken}`,
            },
          }
        )
      },
      {
        onMutate: async (inputText: string) => {
          const shouldRefetch = { value: false }
          await queryClient.cancelQueries(GET_REPLIES_FOR_COMMENT.queryKey(commentId))
          await queryClient.cancelQueries(GET_ONE_POST.queryKey(postId))

          const previousReplies = queryClient.getQueryData<any>(GET_REPLIES_FOR_COMMENT.queryKey(commentId))
          const previousPost: any = queryClient.getQueryData(GET_ONE_POST.queryKey(postId))

          const newReply = {
            id: cuid(),
            replyText: inputText,
            userId: user?.uid,
            postId: postId,
            commentId: commentId,
            repliedToUserUid: repliedToUser.uid,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            repliedToUser: {
              uid: repliedToUser.uid,
              avatar: repliedToUser.avatar,
              username: repliedToUser.username,
              profile: {
                displayName: repliedToUser.profile.displayName,
              },
            },
            user: {
              uid: user?.uid,
              avatar: user?.avatar,
              username: user?.username,
              profile: {
                displayName: user?.profile.displayName,
              },
            },
          }

          if (previousReplies) {
            const copyPreviousReplies = previousReplies
            copyPreviousReplies.pages[copyPreviousReplies.pages.length - 1].reply.push(newReply)

            queryClient.setQueryData(GET_REPLIES_FOR_COMMENT.queryKey(commentId), copyPreviousReplies)
            queryClient.setQueryData(GET_ONE_POST.queryKey(postId), {
              ...previousPost,
              _count: {
                ...previousPost._count,
                comment: previousPost._count.comment + 1,
              },
            })
          } else {
            shouldRefetch.value = true
          }

          return {
            previousReplies,
            previousPost,
            shouldRefetch: shouldRefetch.value,
            newReplyId: newReply.id,
          }
        },
        onError: (_err, _vars, context) => {
          if (context?.previousReplies) {
            queryClient.setQueryData<any>(GET_COMMENTS_FOR_POST.queryKey(postId), context.previousReplies)
          }
          if (context?.previousPost) {
            queryClient.setQueryData<any>(GET_ONE_POST.queryKey(postId), context.previousPost)
          }
        },
        onSuccess: (data, _vars, context) => {
          console.log(data)
          if (context?.shouldRefetch) {
            refetchIfNoReplies()
          } else {
            const idFromServer = data.data.id
            const previousReplies = queryClient.getQueryData<any>(GET_REPLIES_FOR_COMMENT.queryKey(commentId))
            const newReplyId = context?.newReplyId

            if (previousReplies) {
              const copyPreviousReplies = previousReplies
              copyPreviousReplies.pages[copyPreviousReplies.pages.length - 1].reply.find(
                (reply: any) => reply.id === newReplyId
              ).id = idFromServer
              queryClient.setQueryData(GET_REPLIES_FOR_COMMENT.queryKey(commentId), copyPreviousReplies)
            }
          }
        },
        onSettled: () => {
          //!! this will not work becuase inside useInfiniteQuery I passed {enabled: false}
          // queryClient.invalidateQueries(['reply', { commentId: commentId }])

          setInputText('')
          if (setReply) {
            setReply({ show: false, replyText: '' })
          }
        },
      }
    )

    const handleCreateComment = () => {
      if (inputText.trim() === '') return
      commentMutation.mutate(inputText)
    }

    const handleCreateReply = async () => {
      if (inputText.trim() === '') return
      replyMutation.mutate(inputText)
    }

    return (
      <>
        <div className="relative my-4">
          <Input
            ref={ref}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            id="textInput"
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                isReply ? handleCreateReply() : handleCreateComment()
              }
            }}
            placeholder={commentId ? 'Your reply' : 'Your comment'}
          />
          <button
            onClick={isReply ? handleCreateReply : handleCreateComment}
            className="absolute top-1/2 transform -translate-y-1/2 right-2 px-2 py-0.5 rounded text-xs text-white bg-indigo-500 font-medium active:bg-indigo-600 disabled:opacity-50"
          >
            send
          </button>
        </div>
      </>
    )
  }
)

import cuid from 'cuid'
import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { Input } from '../../atoms/Input/Input'

export const CommentReplyInput = ({
  postId,
  commentId,
  isReply,
  repliedToUser,
  setReply,
  refetchIfNoReplies,
}: {
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
}) => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [inputText, setInputText] = useState('')

  const commentMutation = useMutation(
    (inputText: string) => {
      return axios.post(
        `/post/comment/${postId}`,
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
        await queryClient.cancelQueries(['post', { id: postId, comment: true }])
        await queryClient.cancelQueries(['post', postId])

        const previousComments = queryClient.getQueryData<any>([
          'post',
          { id: postId, comment: true },
        ])
        console.log(previousComments)
        const previousPost: any = queryClient.getQueryData(['post', postId])
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

          queryClient.setQueryData(['post', { id: postId, comment: true }], newCommentsData)

          queryClient.setQueryData(['post', postId], {
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
          queryClient.setQueryData<any>(
            ['post', { id: postId, comment: true }],
            context.previousComments
          )
        }
        if (context?.previousPost) {
          queryClient.setQueryData<any>(['post', postId], context.previousPost)
        }
      },
      onSuccess: () => {},
      onSettled: () => {
        queryClient.invalidateQueries(['post', { id: postId, comment: true }])
      },
    }
  )

  const replyMutation = useMutation(
    (inputText: string) => {
      return axios.post(
        `/post/comment/reply/${postId}/${commentId}`,
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
        await queryClient.cancelQueries(['reply', { commentId: commentId }])
        await queryClient.cancelQueries(['post', postId])

        const previousReplies = queryClient.getQueryData<any>(['reply', { commentId: commentId }])
        const previousPost: any = queryClient.getQueryData(['post', postId])

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

          queryClient.setQueryData(['reply', { commentId: commentId }], copyPreviousReplies)
          queryClient.setQueryData(['post', postId], {
            ...previousPost,
            _count: {
              ...previousPost._count,
              comment: previousPost._count.comment + 1,
            },
          })
        } else {
          refetchIfNoReplies()
          console.log('no replies dude')
        }

        return { previousReplies, previousPost }
      },
      onError: (_err, _vars, context) => {
        if (context?.previousReplies) {
          queryClient.setQueryData<any>(
            ['post', { id: postId, comment: true }],
            context.previousReplies
          )
        }
        if (context?.previousPost) {
          queryClient.setQueryData<any>(['post', postId], context.previousPost)
        }
      },
      onSuccess: (data) => {
        console.log(data)
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
    console.log('I will create a comment')
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
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          id="textInput"
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

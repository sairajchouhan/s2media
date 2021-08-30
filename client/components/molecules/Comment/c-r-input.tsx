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
}: {
  postId: string
  commentId?: string
  isReply: boolean
  repliedToUser?: any
}) => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [inputText, setInputText] = useState(
    repliedToUser?.username ? `@${repliedToUser?.username} ` : ''
  )

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
        await queryClient.cancelQueries(['post', { id: postId, comments: true }])
        await queryClient.cancelQueries(['post', postId])

        const previousComments = queryClient.getQueryData<any>([
          'post',
          { id: postId, comments: true },
        ])
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
          reply: [],
        }

        if (previousComments) {
          queryClient.setQueryData(['post', { id: postId, comments: true }], {
            comments: [newComment, ...previousComments.comments],
          })
          queryClient.setQueryData(['post', postId], {
            ...previousPost,
            _count: {
              ...previousPost._count,
              comment: previousPost._count.comment + 1,
            },
          })
        }

        return { previousComments, previousPost }
      },
      onError: (_err, _vars, context) => {
        if (context?.previousComments) {
          queryClient.setQueryData<any>(
            ['post', { id: postId, comments: true }],
            context.previousComments
          )
        }
        if (context?.previousPost) {
          queryClient.setQueryData<any>(['post', postId], context.previousPost)
        }
      },
      onSuccess: () => {
        setInputText('')
      },
      onSettled: () => {
        queryClient.invalidateQueries(['post', { id: postId, comments: true }])
      },
    }
  )

  const handleCreateComment = () => {
    if (inputText.trim() === '') return
    commentMutation.mutate(inputText)
  }

  const handleCreateReply = async () => {
    if (inputText.trim() === '') return
    try {
      await axios.post(
        `/post/comment/reply/${postId}/${commentId}`,
        {
          replyText: inputText,
          repliedToUserUid: repliedToUser?.uid,
          repliedToUserName: repliedToUser?.username,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.idToken}`,
          },
        }
      )
      setInputText('')
    } catch (err) {
      console.log(err)
    }
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
          className="absolute top-1/2 transform -translate-y-1/2 right-2 px-2 py-0.5 rounded text-xs text-white bg-indigo-500 font-medium active:bg-indigo-600"
        >
          send
        </button>
      </div>
    </>
  )
}

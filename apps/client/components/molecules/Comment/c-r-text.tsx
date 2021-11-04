import { formatDistanceToNow } from 'date-fns'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { paths } from '../../../utils/paths'
import {
  DELETE_COMMENT,
  DELETE_REPLY,
  EDIT_COMMENT,
  EDIT_REPLY,
  GET_COMMENTS_FOR_POST,
  GET_ONE_POST,
  GET_REPLIES_FOR_COMMENT,
} from '../../../utils/querykeysAndPaths'
import { IconButton } from '../../atoms/IconButton'
import { Input } from '../../atoms/Input/Input'
import { DeleteIcon } from '../../icons/DeleteIcon'
import { DotsHorizontal } from '../../icons/DotsHorizontal'
import { EditIcon } from '../../icons/EditIcon'
import { Link } from '../../Link'
import { Menu } from '../Menu'

export const CommentReplyText = ({ crEntity, isReply }: { crEntity: any; isReply: boolean }) => {
  const { user, getIdToken } = useAuth()
  const queryClient = useQueryClient()
  const [edit, setEdit] = useState({
    show: false,
    text: isReply ? crEntity.replyText : crEntity.commentText,
  })

  const deleteCommentMutation = useMutation(
    async () => {
      const idToken = await getIdToken()
      return axios.delete(DELETE_COMMENT.path(crEntity.postId, crEntity.id), {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
    },
    {
      onMutate: async () => {
        const postId = crEntity.postId
        await queryClient.cancelQueries(GET_COMMENTS_FOR_POST.queryKey(postId))
        await queryClient.cancelQueries(GET_ONE_POST.queryKey(postId))

        const previousComments = queryClient.getQueryData<any>(GET_COMMENTS_FOR_POST.queryKey(postId))
        const previousPost: any = queryClient.getQueryData(GET_ONE_POST.queryKey(postId))

        if (previousComments) {
          const newCommentsData = previousComments
          newCommentsData.pages.forEach((page: any) => {
            const commentToDelete = page.comment.find((comment: any) => comment.id === crEntity.id)
            if (commentToDelete) {
              const index = page.comment.indexOf(commentToDelete)
              page.comment.splice(index, 1)
            }
          })
          queryClient.setQueryData(GET_COMMENTS_FOR_POST.queryKey(postId), newCommentsData)
          queryClient.setQueryData(GET_ONE_POST.queryKey(postId), {
            ...previousPost,
            _count: {
              ...previousPost._count,
              comment: previousPost._count.comment - 1,
            },
          })
        }
        return { previousComments, previousPost }
      },
      onError: (_err, _vars, context) => {
        if (context?.previousComments) {
          queryClient.setQueryData<any>(GET_COMMENTS_FOR_POST.queryKey(crEntity.postId), context.previousComments)
        }
        if (context?.previousPost) {
          queryClient.setQueryData<any>(GET_ONE_POST.queryKey(crEntity.postId), context.previousPost)
        }
      },
      onSuccess: () => {},
      onSettled: () => {
        queryClient.invalidateQueries(GET_COMMENTS_FOR_POST.queryKey(crEntity.postId))
      },
    }
  )

  const editCommentMutation = useMutation(
    async () => {
      const idToken = await getIdToken()
      return axios.put(
        EDIT_COMMENT.path(crEntity.postId, crEntity.id),
        {
          commentText: edit.text,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      )
    },
    {
      onMutate: async () => {
        const postId = crEntity.postId
        await queryClient.cancelQueries(GET_COMMENTS_FOR_POST.queryKey(postId))
        await queryClient.cancelQueries(GET_ONE_POST.queryKey(postId))

        const previousComments = queryClient.getQueryData<any>(GET_COMMENTS_FOR_POST.queryKey(postId))

        if (previousComments) {
          const newCommentsData = previousComments
          newCommentsData.pages.forEach((page: any) => {
            page.comment.forEach((comment: any) => {
              if (comment.id === crEntity.id) {
                comment.commentText = edit.text
              }
            })
          })
          queryClient.setQueryData(GET_COMMENTS_FOR_POST.queryKey(postId), newCommentsData)
        }
        setEdit({ text: edit.text, show: false })
        return { previousComments }
      },
      onError: (_err, _vars, context) => {
        if (context?.previousComments) {
          queryClient.setQueryData<any>(GET_COMMENTS_FOR_POST.queryKey(crEntity.postId), context.previousComments)
        }
      },
      onSuccess: () => {},
      onSettled: () => {
        queryClient.invalidateQueries(GET_COMMENTS_FOR_POST.queryKey(crEntity.postId))
      },
    }
  )

  const deleteReplyMutation = useMutation(
    async () => {
      const idToken = await getIdToken()
      return axios.delete(DELETE_REPLY.path(crEntity.postId, crEntity.commentId, crEntity.id), {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
    },
    {
      onMutate: async () => {
        const postId = crEntity.postId
        const commentId = crEntity.commentId
        await queryClient.cancelQueries(GET_REPLIES_FOR_COMMENT.queryKey(commentId))
        await queryClient.cancelQueries(GET_REPLIES_FOR_COMMENT.queryKey(commentId))
        await queryClient.cancelQueries(GET_ONE_POST.queryKey(postId))

        const previousReplies = queryClient.getQueryData<any>(GET_REPLIES_FOR_COMMENT.queryKey(commentId))
        const previousPost: any = queryClient.getQueryData(GET_ONE_POST.queryKey(postId))

        if (previousReplies) {
          const newRepliesCopy = previousReplies
          newRepliesCopy.pages.forEach((page: any) => {
            const replyToDelete = page.reply.find((reply: any) => reply.id === crEntity.id)
            if (replyToDelete) {
              const index = page.reply.indexOf(replyToDelete)
              page.reply.splice(index, 1)
            }
          })
          queryClient.setQueryData(GET_REPLIES_FOR_COMMENT.queryKey(commentId), newRepliesCopy)
          queryClient.setQueryData(GET_ONE_POST.queryKey(postId), {
            ...previousPost,
            _count: {
              ...previousPost._count,
              comment: previousPost._count.comment - 1,
            },
          })
        }
        return { previousReplies, previousPost }
      },
      onError: (_err, _vars, context) => {
        if (context?.previousReplies) {
          queryClient.setQueryData<any>(GET_REPLIES_FOR_COMMENT.queryKey(crEntity.commentId), context.previousReplies)
        }
        if (context?.previousPost) {
          queryClient.setQueryData<any>(GET_ONE_POST.queryKey(crEntity.postId), context.previousPost)
        }
      },
      onSuccess: () => {},
      onSettled: () => {
        queryClient.invalidateQueries(GET_REPLIES_FOR_COMMENT.queryKey(crEntity.commentId))
      },
    }
  )

  const editReplyMutation = useMutation(
    async () => {
      const idToken = await getIdToken()
      return axios.put(
        EDIT_REPLY.path(crEntity.postId, crEntity.commentId, crEntity.id),
        {
          replyText: edit.text,
        },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      )
    },
    {
      onMutate: async () => {
        const commentId = crEntity.commentId
        await queryClient.cancelQueries(GET_REPLIES_FOR_COMMENT.queryKey(commentId))

        const previousReplies = queryClient.getQueryData<any>(GET_REPLIES_FOR_COMMENT.queryKey(commentId))

        if (previousReplies) {
          const newRepliesData = previousReplies
          newRepliesData.pages.forEach((page: any) => {
            page.reply.forEach((reply: any) => {
              if (reply.id === crEntity.id) {
                reply.replyText = edit.text
              }
            })
          })
          queryClient.setQueryData(GET_REPLIES_FOR_COMMENT.queryKey(commentId), newRepliesData)
        }
        setEdit({ text: edit.text, show: false })
        return { previousReplies }
      },
      onError: (_err, _vars, context) => {
        if (context?.previousReplies) {
          queryClient.setQueryData<any>(GET_COMMENTS_FOR_POST.queryKey(crEntity.postId), context.previousReplies)
        }
      },
      onSuccess: () => {},
      onSettled: () => {
        queryClient.invalidateQueries(GET_REPLIES_FOR_COMMENT.queryKey(crEntity.commentId))
      },
    }
  )

  const handleCrDelete = () => (isReply ? deleteReplyMutation.mutate() : deleteCommentMutation.mutate())

  const handleCrEdit = () => (isReply ? editReplyMutation.mutate() : editCommentMutation.mutate())

  return (
    <div className="px-2 bg-gray-100 rounded-md">
      <div className="flex items-start justify-between">
        <div className="">
          <div className="flex items-center">
            <Link to={paths.profile({ username: crEntity.user.username })}>
              <p className="text-sm font-semibold leading-4 text-gray-800 cursor-pointer hover:underline">
                {crEntity.user.profile.displayName}
              </p>
            </Link>
            <div className="mx-1 text-base font-normal text-gray-600">·</div>
            <Link to={paths.profile({ username: crEntity.user.username })}>
              <p className="text-xs text-gray-500 cursor-pointer">@{crEntity.user.username}</p>
            </Link>
          </div>
          <p className="text-xs leading-4 text-gray-500">
            {formatDistanceToNow(new Date(crEntity.createdAt), {
              addSuffix: true,
              includeSeconds: true,
            })}
          </p>
        </div>
        <div className="flex">
          <Menu
            activationButton={() => <IconButton w="w-4" h="h-4" hoverBgColor="bg-gray-100" icon={DotsHorizontal} />}
          >
            {crEntity.userId === user?.uid ? (
              <>
                <Menu.Item icon={EditIcon} onClick={() => setEdit((edit) => ({ ...edit, show: true }))}>
                  Edit
                </Menu.Item>
                <Menu.Item
                  className="text-red-500"
                  activeClassName="hover:bg-red-50"
                  icon={DeleteIcon}
                  onClick={handleCrDelete}
                >
                  Delete
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>Report</Menu.Item>
              </>
            )}
          </Menu>
        </div>
      </div>
      <div className="pb-2 mt-1">
        {edit.show ? (
          <div>
            <Input
              name="editComment"
              id="editComment"
              placeholder="Your comment"
              value={edit.text}
              onChange={(e) => setEdit((edit) => ({ ...edit, text: e.target.value }))}
            />
            <div className="mt-1">
              <button
                onClick={() =>
                  setEdit((edit) => ({
                    ...edit,
                    show: false,
                    text: isReply ? crEntity.replyText : crEntity.commentText,
                  }))
                }
                className="bg-red-500 mr-2 text-xs px-2 py-0.5 text-white rounded-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleCrEdit}
                disabled={edit.text.trim() === ''}
                className="bg-indigo-500 text-xs px-2 py-0.5 text-white rounded-sm"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm">{isReply ? crEntity.replyText : crEntity.commentText}</p>
        )}
      </div>
    </div>
  )
}

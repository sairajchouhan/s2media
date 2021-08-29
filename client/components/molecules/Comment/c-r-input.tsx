import React, { useState } from 'react'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { Input } from '../../atoms/Input/Input'

export const CommentReplyInput = ({
  postId,
  commentId,
  repliedToUser,
}: {
  postId: string
  commentId?: string
  repliedToUser?: any
}) => {
  const { user } = useAuth()
  const [inputText, setInputText] = useState('')
  console.log('+', repliedToUser)

  const handleCreateComment = async () => {
    if (inputText.trim() === '') return
    try {
      await axios.post(
        `/post/comment/${postId}`,
        {
          commentText: inputText,
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
    <div className="relative my-4">
      <Input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        id="textInput"
        placeholder={commentId ? 'Your reply' : 'Your comment'}
      />
      <button
        onClick={commentId ? handleCreateReply : handleCreateComment}
        className="absolute top-1/2 transform -translate-y-1/2 right-2 px-2 py-0.5 rounded text-xs text-white bg-indigo-500 font-medium active:bg-indigo-600"
      >
        send
      </button>
    </div>
  )
}

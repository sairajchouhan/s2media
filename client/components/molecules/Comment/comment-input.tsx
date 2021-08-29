import React from 'react'
import { Input } from '../../atoms/Input/Input'

export const CommentInput = () => {
  return (
    <div className="relative mt-4">
      <Input id="commentInput" placeholder="Your comment" />
      <button className="absolute top-1/2 transform -translate-y-1/2 right-2 px-2 py-0.5 rounded text-xs text-white bg-indigo-500 font-medium active:bg-indigo-600">
        send
      </button>
    </div>
  )
}

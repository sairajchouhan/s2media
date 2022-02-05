import React, { useState } from 'react'
import UserListModel from '../../organisms/UserListModel'

interface IPostFootLikeCommentCount {
  count: number
  type: 'likes' | 'comments'
  data?: Array<any>
  showModel?: boolean
}

const PostFootLikeCommentCount = ({
  count,
  type,
  data,
  showModel = true,
}: IPostFootLikeCommentCount) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen((open) => !open)
  }

  return (
    <div>
      <p
        className={`text-sm text-gray-600  ${showModel && data ? 'cursor-pointer' : ''}`}
        onClick={showModel ? () => setOpen(true) : undefined}
      >
        <span>
          {count} {type}
        </span>
      </p>
      {data && showModel ? (
        <UserListModel
          data={data}
          title={`${type[0].toUpperCase()}${type.slice(1)}`}
          open={open}
          toggleOpen={toggleOpen}
        />
      ) : null}
    </div>
  )
}

export default PostFootLikeCommentCount

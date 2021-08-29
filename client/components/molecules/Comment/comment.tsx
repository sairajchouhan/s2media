import React from 'react'
import { paths } from '../../../utils/paths'
import { Avatar } from '../../atoms/Avatar'
import { IconButton } from '../../atoms/IconButton/icon-button'
import { DotsHorizontal } from '../../icons'
import { Link } from '../../Link'

export const Comment = ({ comment }: { comment: any }) => {
  return (
    <div className="flex items-start my-3">
      <Link to={paths.profile({ username: comment.user.username })}>
        <Avatar src={comment.user.avatar} w="w-10" h="h-10" alt="user profile image" />
      </Link>
      <div className="flex-1 px-2 bg-gray-100 rounded">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to={paths.profile({ username: comment.user.username })}>
              <p className="text-sm font-semibold leading-4 text-gray-800 cursor-pointer hover:underline">
                {comment.user.profile.displayName}
              </p>
            </Link>
            <div className="mx-1 text-base font-normal text-gray-600">·</div>
            <p className="text-sm leading-5 text-gray-500 text-md">
              <p className="text-xs leading-4 text-gray-500">{JSON.stringify(comment.createdAt)}</p>
            </p>
          </div>
          <div className="">
            <IconButton w="w-4" h="h-4" hoverBgColor="bg-gray-100" icon={DotsHorizontal} />
          </div>
        </div>
        <div className="pb-2 -mt-1">
          <p className="text-sm">{comment.commentText}</p>
        </div>
      </div>
    </div>
  )
}

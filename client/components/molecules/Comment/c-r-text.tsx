import React from 'react'
import { paths } from '../../../utils/paths'
import { IconButton } from '../../atoms/IconButton/icon-button'
import { DotsHorizontal } from '../../icons'
import { Link } from '../../Link'

export const CommentReplyText = ({ crEntity, isReply }: { crEntity: any; isReply?: boolean }) => {
  return (
    <div className="px-2 bg-gray-100 rounded">
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
          <p className="text-xs leading-4 text-gray-500">{JSON.stringify(crEntity.createdAt)}</p>
        </div>
        <div className="flex">
          <IconButton w="w-4" h="h-4" hoverBgColor="bg-gray-100" icon={DotsHorizontal} />
        </div>
      </div>
      <div className="pb-2 mt-1">
        <p className="text-sm">{isReply ? crEntity.replyText : crEntity.commentText}</p>
      </div>
    </div>
  )
}

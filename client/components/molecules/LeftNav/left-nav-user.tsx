import React from 'react'
import MoreHorizontal from '../../../assets/svgs/moreh.svg'
import { SessionUser } from '../../../types/user'
import { Avatar } from '../../atoms/Avatar'

export interface LeftNavUserProps {
  user: SessionUser
}

export const LeftNavUser = ({ user: { username, displayName, avatar } }: LeftNavUserProps) => {
  return (
    <li className="flex items-center px-8 py-4 mt-auto mb-3 rounded-lg cursor-pointer select-none hover:bg-indigo-50">
      <div className="flex items-center w-full ">
        <div className="grid place-items-center">
          <Avatar src={avatar} alt="ransom image from unsplash" w="w-10" h="h-10" />
        </div>
        <div className="flex items-center justify-between flex-1 pl-3">
          <div>
            <p className="text-base font-bold leading-5">{displayName}</p>
            <p className="text-base font-semibold text-gray-600">@{username}</p>
          </div>
          <div className="w-4 h-4 text-gray-600">
            <MoreHorizontal />
          </div>
        </div>
      </div>
    </li>
  )
}

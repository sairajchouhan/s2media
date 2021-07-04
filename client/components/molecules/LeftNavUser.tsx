import React from 'react'
import MoreHorizontal from '../../assets/svgs/moreh.svg'
import { Avatar } from '../atoms/Avatar/avatar'

interface LeftNavUserProps {
  src: string
  username?: string
  displayName?: string
}

const LeftNavUser = ({ src }: LeftNavUserProps) => {
  return (
    <div className="flex items-center w-full ">
      <div className="grid place-items-center">
        <Avatar src={src} alt="ransom image from unsplash" w={40} h={40} />
      </div>
      <div className="flex items-center justify-between flex-1 pl-3">
        <div>
          <p className="text-base font-bold leading-5">DynamiteRaj</p>
          <p className="text-base font-semibold text-gray-600">@sairaj2119</p>
        </div>
        <div className="w-5 h-5 text-gray-600">
          <MoreHorizontal />
        </div>
      </div>
    </div>
  )
}

export default LeftNavUser

/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import React from 'react'
import CommentPost from '../../assets/svgs/commentpost.svg'
import HeartOutline from '../../assets/svgs/heartout.svg'
import MoreHorizontal from '../../assets/svgs/moreh.svg'
import Saved from '../../assets/svgs/savedoutline.svg'
import { useUser } from '../../hooks/useUser'
import { Avatar } from '../atoms/Avatar'
import { IconButton } from '../atoms/IconButton'
import { NextImage } from '../atoms/Image'

export const Post = () => {
  const user = useUser()
  if (!user) return null

  return (
    <div className="overflow-hidden transition-all border rounded-lg shadow-sm border-opacity-80 hover:bg-gray-50">
      <div className="flex items-center justify-between px-2 py-3">
        <div className="flex items-center ">
          <Avatar src={user.avatar} w="w-10" h="h-10" alt="user profile image" />
          <div className="flex flex-col pl-2">
            <p className="font-semibold leading-5 text-gray-800 text-md">{user.username}</p>
            <p className="text-xs text-gray-500">2 min ago</p>
          </div>
        </div>
        <div>
          <IconButton w="w-4" h="h-4" icon={MoreHorizontal} />
        </div>
      </div>
      <main className="">
        <div className="">
          <NextImage src="https://images.unsplash.com/photo-1625312815354-538eaa7ceced?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex">
            <IconButton
              w="w-6"
              h="h-6"
              textColour="text-red-600"
              hoverBgColor="bg-red-100"
              icon={HeartOutline}
            />
            <IconButton w="w-6" h="h-6" icon={CommentPost} />
          </div>
          <div>
            <IconButton icon={Saved} w="w-6" h="h-6" />
          </div>
        </div>
      </main>
    </div>
  )
}

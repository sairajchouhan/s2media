/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import React from 'react'
import CommentPost from '../../assets/svgs/commentpost.svg'
import HeartOutline from '../../assets/svgs/heartout.svg'
import MoreHorizontal from '../../assets/svgs/moreh.svg'
import Saved from '../../assets/svgs/savedoutline.svg'
import { useUser } from '../../hooks/useUser'
import { NextImage } from '../atoms/Image'
import { PostFoot } from '../molecules/PostFoot'
import { PostHead } from '../molecules/PostHead'

export const Post = () => {
  const user = useUser()
  if (!user) return null

  return (
    <div className="overflow-hidden transition-all border rounded-lg shadow-sm border-opacity-80 hover:bg-gray-50">
      <PostHead user={user} moreIcon={MoreHorizontal} />
      <main className="">
        <div className="">
          <NextImage src="https://images.unsplash.com/photo-1625312815354-538eaa7ceced?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
        </div>
      </main>
      <PostFoot icon1={HeartOutline} icon2={CommentPost} icon3={Saved} />
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import CommentPost from '../../assets/svgs/commentpost.svg'
import HeartOutline from '../../assets/svgs/heartout.svg'
import MoreHorizontal from '../../assets/svgs/moreh.svg'
import Saved from '../../assets/svgs/savedoutline.svg'
import { useUser } from '../../hooks/useUser'
import { NextImage } from '../atoms/Image'
import { PostFoot } from '../molecules/PostFoot'
import { PostHead } from '../molecules/PostHead'

export interface PostProps {
  url: string
  caption?: string
  id: string
}

export const Post = ({ url, caption, id }: PostProps) => {
  const user = useUser()
  const { push } = useRouter()
  if (!user) return null

  return (
    <div className="mt-6 overflow-hidden transition-all border rounded-lg shadow-sm border-opacity-80 hover:bg-gray-50">
      <PostHead id={id} caption={caption} user={user} moreIcon={MoreHorizontal} />
      <main className="cursor-pointer" onClick={() => push(`/post/${id}`)}>
        <NextImage src={url} />
      </main>
      <PostFoot id={id} icon1={HeartOutline} icon2={CommentPost} icon3={Saved} />
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import CommentPost from '../../assets/svgs/commentpost.svg'
import HeartOutline from '../../assets/svgs/heartout.svg'
import MoreHorizontal from '../../assets/svgs/moreh.svg'
import Saved from '../../assets/svgs/savedoutline.svg'
import { useUser } from '../../hooks/useUser'
import { PostWithUserAndProfile } from '../../types/post'
import { NextImage } from '../atoms/Image'
import { PostFoot } from '../molecules/PostFoot'
import { PostHead } from '../molecules/PostHead'

export interface PostProps {
  post: PostWithUserAndProfile
}

export const Post = ({ post }: PostProps) => {
  const user = useUser()
  const { push } = useRouter()
  if (!user) return null

  return (
    <div className="mt-6 overflow-hidden transition-all border rounded-sm shadow-sm border-opacity-80 hover:bg-gray-50">
      <PostHead post={post} moreIcon={MoreHorizontal} />
      <main className="cursor-pointer" onClick={() => push(`/post/${post.id}`)}>
        <NextImage src={post.url} />
      </main>
      <PostFoot id={post.id} icon1={HeartOutline} icon2={CommentPost} icon3={Saved} />
    </div>
  )
}

/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { useAuth } from '../../context/authContext'
import { PostWithUserAndProfile } from '../../types/post'
import { NextImage } from '../atoms/Image'
import { DotsHorizontal, HeartIcon } from '../icons'
import { PostFoot, PostHead } from '../molecules/Post'

export interface PostProps {
  post: PostWithUserAndProfile
}

export const Post = ({ post }: PostProps) => {
  const { user } = useAuth()
  const { push } = useRouter()
  if (!user) return null

  return (
    <div className="overflow-hidden transition-all border-b rounded-sm shadow-sm border-opacity-80 hover:bg-gray-50">
      <PostHead post={post} icon={DotsHorizontal} />
      <main className="cursor-pointer" onClick={() => push(`/post/${post.id}`)}>
        <NextImage src={post.url} />
      </main>
      <PostFoot icon1={HeartIcon} post={post} />
    </div>
  )
}

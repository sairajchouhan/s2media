/* eslint-disable @next/next/no-img-element */
// import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { PostWithBaseUser } from '../../types/post'
import { NextImage } from '../atoms/Image'
import { DotsHorizontal } from '../icons'
import { PostFoot, PostHead } from '../molecules/Post'

export interface PostProps {
  post: PostWithBaseUser
}

export const Post = ({ post }: PostProps) => {
  const { push } = useRouter()
  console.log(post)

  return (
    <div className="overflow-hidden transition-all border-b rounded-sm shadow-sm border-opacity-80 hover:bg-gray-50">
      <PostHead post={post} icon={DotsHorizontal} />
      <main className="cursor-pointer" onClick={() => push(`/post/${post.id}`)}>
        <NextImage src={post.url} />
      </main>
      <PostFoot post={post} />
    </div>
  )
}

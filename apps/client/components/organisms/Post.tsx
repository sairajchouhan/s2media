import { useRouter } from 'next/router'
import React from 'react'
import { PostWithBaseUser } from '../../types/post'
import { DotsHorizontal } from '../icons'
import { PostFoot, PostHead } from '../molecules/Post'

export interface PostProps {
  post: PostWithBaseUser
}

export const Post = ({ post }: PostProps) => {
  const { push } = useRouter()

  return (
    <div className="overflow-hidden transition-all border-b rounded-sm shadow-sm border-opacity-80 hover:bg-gray-50">
      <PostHead post={post} icon={DotsHorizontal} />
      <main className="cursor-pointer" onClick={() => push(`/post/${post.id}`)}>
        <img src={post.url} alt={post.caption} />
      </main>
      <PostFoot post={post} />
    </div>
  )
}

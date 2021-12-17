import React from 'react'
import { PostWithBaseUser } from '../../types/post'
import { DotsHorizontal } from '../icons'
import { PostFoot, PostHead } from '../molecules/Post'

export interface PostProps {
  post: PostWithBaseUser
}

export const Post = ({ post }: PostProps) => {
  return (
    <div className="px-3 py-2 overflow-hidden transition-all border-b rounded-sm shadow-sm border-opacity-80 hover:bg-gray-50">
      <PostHead post={post} icon={DotsHorizontal} />
      <main className="pt-5 pb-3">
        {post.caption ? (
          <div className="">
            <p className="items-end flex-1 text-lg font-normal leading-6 text-gray-900">
              {post.caption}
            </p>
          </div>
        ) : null}
        {post.url ? (
          <div className="mt-3 overflow-hidden rounded-md">
            <img src={post.url} alt={post.caption} />
          </div>
        ) : null}
      </main>
      <PostFoot post={post} />
    </div>
  )
}

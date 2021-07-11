import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CommentPost from '../../assets/svgs/commentpost.svg'
import HeartOutline from '../../assets/svgs/heartout.svg'
import MoreHorizontal from '../../assets/svgs/moreh.svg'
import Saved from '../../assets/svgs/savedoutline.svg'
import { NextImage } from '../../components/atoms/Image/image'
import { PageNav } from '../../components/molecules/PageNav/page-nav'
import { PostFoot } from '../../components/molecules/PostFoot/post-foot'
import { PostHead } from '../../components/molecules/PostHead/post-head'
import PrivateRoute from '../../components/PrivateRoute'
import { PostWithUser } from '../../types/post'

const EachPost = () => {
  const router = useRouter()
  const params = router.query
  const [post, setPost] = useState<PostWithUser | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const post = await axios.get('http://localhost:5000/api/v1/post/' + params.postId)
        setPost(post.data)
      } catch (err) {
        console.log(err)
      }
    })()
  }, [params.postId])

  console.log(post)
  if (!post) return null

  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Post" />
        <main className="hover:bg-gray-50">
          <PostHead post={post} moreIcon={MoreHorizontal} />
          <main>
            <NextImage src={post.url} />
          </main>
          <PostFoot id={post.id} icon1={HeartOutline} icon2={CommentPost} icon3={Saved} />
        </main>
      </div>
    </PrivateRoute>
  )
}

export default EachPost

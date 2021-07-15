import axios from 'axios'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import CommentPost from '../../assets/svgs/commentpost.svg'
import HeartOutline from '../../assets/svgs/heartout.svg'
import MoreHorizontal from '../../assets/svgs/moreh.svg'
import Saved from '../../assets/svgs/savedoutline.svg'
import { NextImage } from '../../components/atoms/Image/image'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { PostFoot } from '../../components/molecules/Post/post-foot'
import { PostHead } from '../../components/molecules/Post/post-head'
import PrivateRoute from '../../components/PrivateRoute'

const EachPost = () => {
  const router = useRouter()
  const params = router.query

  const { isLoading, data: post, isError } = useQuery(['post', params.postId], async () => {
    const post = await axios.get('http://localhost:5000/api/v1/post/' + params.postId)
    return post.data
  })

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>Something went wrong</h1>

  return (
    <PrivateRoute>
      <div className="min-h-screen border-l border-r border-opacity-80">
        <PageNav title="Post" />
        <main className="">
          <PostHead post={post} moreIcon={MoreHorizontal} />
          <main>
            <NextImage src={post.url} />
          </main>
          <PostFoot icon1={HeartOutline} icon2={CommentPost} icon3={Saved} />
        </main>
      </div>
    </PrivateRoute>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/auth/session')
  const data = await res.json()

  console.log(data)

  return {
    props: {},
  }
}

export default EachPost

import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import { NextImage } from '../../components/atoms/Image'
import { DotsHorizontal } from '../../components/icons'
import { Comment, CommentReplyInput } from '../../components/molecules/Comment'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { PostFoot } from '../../components/molecules/Post/post-foot'
import { PostHead } from '../../components/molecules/Post/post-head'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { PostWithBaseUser } from '../../types/post'

const EachPost = () => {
  const router = useRouter()
  const params = router.query
  const { user } = useAuth()

  const {
    data: post,
    isError,
    isLoading,
  } = useQuery<PostWithBaseUser>(['post', params.postId], async ({ queryKey }) => {
    const { data } = await axios.get(`/post/${queryKey[1]}`, {
      headers: {
        Authorization: `Bearer ${user?.idToken}`,
      },
    })
    return data
  })

  const {
    data: commentsData,
    isLoading: isLoadingComments,
    isError: isErrorComments,
  } = useQuery(
    ['post', { id: post?.id, comment: true }],
    async ({ queryKey }) => {
      let qk = queryKey[1] as any
      const { data } = await axios.get(`/post/comment/${qk.id}`, {
        headers: {
          Authorization: `Bearer ${user?.idToken}`,
        },
      })
      return data
    },
    {
      enabled: !!post,
    }
  )

  if (isError || !post) return <h1>An error has occured</h1>

  return (
    <div className="min-h-screen border-l border-r border-opacity-80">
      <PageNav title="Post" />
      <main className="">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <PostHead post={post} icon={DotsHorizontal} />
            <main>
              <NextImage src={post.url} />
            </main>
            <PostFoot post={post} />
            <section className="px-4 pb-10 border-opacity-80">
              <CommentReplyInput isReply={false} postId={post.id} />
              {isLoadingComments ? (
                <div>Loading...</div>
              ) : isErrorComments ? (
                <div>Something went wrong</div>
              ) : (
                <div>
                  {commentsData &&
                    commentsData.comments.map((comment: any) => (
                      <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default EachPost

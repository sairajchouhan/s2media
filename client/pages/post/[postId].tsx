import { useRouter } from 'next/router'
import React from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { Button } from '../../components/atoms/Button'
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
    data: commentData,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ['post', { id: post?.id, comment: true }],
    async ({ queryKey, pageParam = '' }) => {
      let qk = queryKey[1] as any
      const { data } = await axios.get(`/post/comment/${qk.id}?cursor=${pageParam}`, {
        headers: {
          Authorization: `Bearer ${user?.idToken}`,
        },
      })
      return data
    },
    {
      enabled: !!post,
      getNextPageParam: (lastPage) => {
        return lastPage.nextCursor ?? false
      },
    }
  )

  const handleClickMoreComments = () => {
    fetchNextPage()
  }

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
            <section className="px-4 pb-10 mb-20 border-opacity-80">
              <CommentReplyInput isReply={false} postId={post.id} />
              {isLoadingComments ? (
                <div>Loading...</div>
              ) : isErrorComments ? (
                <div>Something went wrong</div>
              ) : (
                <div>
                  {commentData &&
                    commentData.pages.map((page: any) => (
                      <React.Fragment key={page.nextCursor || 'lastPage'}>
                        {page.comment.map((comment: any) => (
                          <Comment key={comment.id} comment={comment} />
                        ))}
                      </React.Fragment>
                    ))}
                </div>
              )}
              {hasNextPage && (
                <Button
                  disabled={isFetchingNextPage}
                  variant="solid"
                  colorScheme="gray"
                  onClick={handleClickMoreComments}
                >
                  {isFetchingNextPage ? 'loading more comments..' : 'show more comments'}
                </Button>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default EachPost

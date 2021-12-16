import type { AxiosError } from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { Button } from '../../components/atoms/Button'
import { CircleLoader } from '../../components/atoms/CircleLoader'
import { Comment, CommentReplyInput } from '../../components/molecules/Comment'
import { PageLayout } from '../../components/molecules/Page'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { Post } from '../../components/organisms/Post'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { PostWithBaseUser } from '../../types/post'
import { GET_COMMENTS_FOR_POST, GET_ONE_POST } from '../../utils/querykeysAndPaths'

const EachPost = () => {
  const router = useRouter()
  const params = router.query
  const { getIdToken } = useAuth()

  const {
    data: post,
    isError,
    isLoading,
    error,
  } = useQuery<PostWithBaseUser, AxiosError>(
    GET_ONE_POST.queryKey(params.postId as string),
    async () => {
      const idToken = await getIdToken()
      const { data } = await axios.get(GET_ONE_POST.path(params.postId as string), {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
      return data
    },
    {
      enabled: !!params.postId,
      retry: false,
    }
  )

  const {
    data: commentData,
    isLoading: isLoadingComments,
    isError: isErrorComments,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    GET_COMMENTS_FOR_POST.queryKey(post?.id),
    async ({ queryKey, pageParam = '' }) => {
      let qk = queryKey[1] as any
      const idToken = await getIdToken()
      const { data } = await axios.get(GET_COMMENTS_FOR_POST.path(qk.id, pageParam), {
        headers: {
          Authorization: `Bearer ${idToken}`,
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

  if (isError) {
    return error?.response?.status === 403 ? (
      <div>
        <h1>Not Authorised to view the requested source</h1>
      </div>
    ) : null
  }
  if (!post) return null

  return (
    <PageLayout>
      <Head>
        <title>Post / S2Media</title>
      </Head>
      <PageNav title="Post" />
      <main className="">
        {isLoading ? (
          <CircleLoader className="pt-10" />
        ) : (
          <>
            <Post post={post} />
            <section className="px-3 pb-10 mb-20 border-opacity-80">
              <CommentReplyInput isReply={false} postId={post.id} />
              {isLoadingComments ? (
                <CircleLoader />
              ) : isErrorComments ? (
                <div>Something went wrong</div>
              ) : (
                <div>
                  {commentData
                    ? commentData.pages.map((page: any) => (
                        <React.Fragment key={page.nextCursor || 'lastPage'}>
                          {page.comment.map((comment: any) => (
                            <Comment key={comment.id} comment={comment} />
                          ))}
                        </React.Fragment>
                      ))
                    : null}
                </div>
              )}
              {hasNextPage ? (
                <Button
                  disabled={isFetchingNextPage}
                  variant="solid"
                  colorScheme="gray"
                  onClick={handleClickMoreComments}
                >
                  {isFetchingNextPage ? 'loading more comments..' : 'show more comments'}
                </Button>
              ) : null}
            </section>
          </>
        )}
      </main>
    </PageLayout>
  )
}

export default EachPost

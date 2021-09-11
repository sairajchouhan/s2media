import { Request, Response } from 'express'
import createError from 'http-errors'
import prisma from '../../prisma'
import { commentAndReplyUser } from './helpers'

// change this later to 3
const commentCount = 10
// const replyCount = 1

export const getCommentsOfPost = async (req: Request, res: Response) => {
  const postId = req.params.postId
  const cursor = (req.query.cursor as string) || undefined
  const cursorObj = cursor ? { id: cursor } : undefined

  const comments = await prisma.comment.findMany({
    where: { post: { id: postId } },
    skip: cursor ? 1 : 0,
    orderBy: {
      createdAt: 'desc',
    },
    cursor: cursorObj,
    take: commentCount,
    include: {
      _count: {
        select: {
          reply: true,
          like: true,
        },
      },
      user: commentAndReplyUser,
      // reply: {
      //   orderBy: {
      //     createdAt: 'desc',
      //   },
      //   take: replyCount,
      //   include: {
      //     repliedToUser: commentAndReplyUser,
      //     user: commentAndReplyUser,
      //   },
      // },
    },
  })
  res.json({ comment: comments, nextCursor: comments[commentCount - 1]?.id ?? undefined })
}

export const createComment = async (req: Request, res: Response) => {
  const { commentText } = req.body
  const postId = req.params.postId
  const userId = req.user.uid

  const comment = await prisma.comment.create({
    data: {
      commentText,
      userId,
      postId,
    },
  })

  console.log(comment)
  return res.json(comment)
}

export const editComment = async (req: Request, res: Response) => {
  const postId = req.params.postId
  const commentId = req.params.commentId
  const userId = req.user.uid
  const { commentText } = req.body

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })
  if (!post) throw createError(404, 'Post does not exist')

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  })

  if (!comment) throw createError(404, 'Comment does not exist')
  if (comment.userId !== userId) throw createError(403, 'Unauthroised')

  const editedComment = await prisma.comment.update({
    where: { id: commentId },
    data: {
      commentText,
    },
  })

  return res.json(editedComment)
}

export const deleteComment = async (req: Request, res: Response) => {
  const postId = req.params.postId
  const commentId = req.params.commentId
  const userId = req.user.uid

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })
  if (!post) throw createError(404, 'Post does not exist')

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      reply: true,
    },
  })

  if (!comment) throw createError(404, 'Comment does not exist')
  if (comment.userId !== userId) throw createError(403, 'Unauthroised')

  if (comment.reply.length > 0) {
    await prisma.reply.deleteMany({
      where: {
        commentId,
      },
    })
  }

  await prisma.comment.delete({
    where: { id: commentId },
  })

  return res.json({ msg: 'Comment deleted successfully' })
}

export const getOneComment = async (req: Request, res: Response) => {
  // const postId = req.params.postId
  const commentId = req.params.commentId

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      reply: true,
    },
  })

  return res.json({ comment })
}

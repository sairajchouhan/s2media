import { Request, Response } from 'express'
import createError from 'http-errors'
import prisma from '../../prisma'
import { commentAndReplyUser } from './helpers'

export const createReplyToComment = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params
  const { replyText, repliedToUserUid } = req.body

  const reply = await prisma.reply.create({
    data: {
      replyText,
      commentId,
      postId,
      repliedToUserUid,
      userId: req.user.uid,
    },
    include: {
      user: commentAndReplyUser,
    },
  })

  return res.json(reply)
}

const replyTakeCount = 10

export const getReplyForComment = async (req: Request, res: Response) => {
  const { postId, commentId } = req.params
  const cursor = (req.query.cursor as string) || undefined
  const cursorObj = cursor ? { id: cursor } : undefined

  const replies = await prisma.reply.findMany({
    skip: cursor ? 1 : 0,
    take: replyTakeCount,
    cursor: cursorObj,
    where: {
      commentId,
      postId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      _count: {
        select: {
          like: true,
        },
      },
      repliedToUser: commentAndReplyUser,
      user: commentAndReplyUser,
    },
  })

  return res.json({ reply: replies, nextCursor: replies[replyTakeCount - 1]?.id ?? undefined })
}

export const editReply = async (req: Request, res: Response) => {
  const { postId, commentId, replyId } = req.params
  const { replyText } = req.body

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      post: true,
    },
  })

  if (!comment) throw createError(404, 'comment does not exist')
  if (comment.post.id !== postId) throw createError(404, 'post does not exist')

  const replyToBeEdited = await prisma.reply.findUnique({
    where: {
      id: replyId,
    },
  })

  if (!replyToBeEdited) throw createError(404, 'reply does not exist')
  if (replyToBeEdited.userId !== req.user.uid) throw createError(403, 'you are not allowed to edit this reply')

  const reply = await prisma.reply.update({
    where: {
      id: replyId,
    },
    data: {
      replyText,
    },
  })

  res.json(reply)
}

export const deleteReply = async (req: Request, res: Response) => {
  const { postId, commentId, replyId } = req.params

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      post: true,
    },
  })

  if (!comment) throw createError(404, 'comment does not exist')
  if (comment.post.id !== postId) throw createError(404, 'post does not exist')

  const replyToBeDeleted = await prisma.reply.findUnique({
    where: {
      id: replyId,
    },
  })

  if (!replyToBeDeleted) throw createError(404, 'reply does not exist')
  if (replyToBeDeleted.userId !== req.user.uid) throw createError(403, 'you are not allowed to delete this reply')

  await prisma.reply.delete({
    where: {
      id: replyId,
    },
  })

  res.json({ msg: 'reply deleted successfully' })
}

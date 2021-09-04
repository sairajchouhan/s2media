import { Request, Response } from 'express'
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

const replyTakeCount = 3

export const getReplyForComment = async (req: Request, res: Response) => {
  console.log('from getReplyForComment')
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
      repliedToUser: commentAndReplyUser,
      user: commentAndReplyUser,
    },
  })

  return res.json({ reply: replies, nextCursor: replies[replyTakeCount - 1]?.id ?? undefined })
}

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

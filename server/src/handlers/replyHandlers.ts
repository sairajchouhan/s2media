import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import prisma from '../../prisma'
import { commentAndReplyUser } from './helpers'

export const createReplyToComment = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }
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

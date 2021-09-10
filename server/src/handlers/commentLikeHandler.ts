import { Request, Response } from 'express'
import createError from 'http-errors'
import prisma from '../../prisma'

export const likeComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  })

  if (!comment) throw createError(404, 'Comment not found')

  return res.json({ msg: 'unfollowed' })
}

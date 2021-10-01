import { Request, Response } from 'express'
import createError from 'http-errors'
import prisma from '../../prisma'

export const likeOrUnlikeComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId
  const userId = req.user.uid
  const postId = req.body.postId

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      like: true,
    },
  })

  if (!comment) throw createError(404, 'Comment not found')
  const liked: boolean = comment.like.filter((like) => like.userId === userId).length > 0

  if (!liked) {
    await prisma.commentReplyLike.create({
      data: {
        commentId,
        userId,
        postId,
      },
    })
    return res.json({ commentLiked: true })
  } else {
    const likeId = comment.like.filter((like) => like.userId === userId)[0].id
    await prisma.commentReplyLike.delete({
      where: {
        id: likeId,
      },
    })
    return res.json({ commentUnLiked: true })
  }
}

export const likeOrUnlikeReply = async (req: Request, res: Response) => {
  console.log('Like or Unlike Reply')
  const replyId = req.params.replyId
  const userId = req.user.uid
  const postId = req.body.postId

  const reply = await prisma.reply.findUnique({
    where: {
      id: replyId,
    },
    include: {
      like: true,
    },
  })

  if (!reply) throw createError(404, 'Comment not found')
  const liked: boolean = reply.like.filter((like) => like.userId === userId).length > 0

  if (!liked) {
    await prisma.commentReplyLike.create({
      data: {
        replyId,
        userId,
        postId,
      },
    })
    return res.json({ replyLiked: true })
  } else {
    const likeId = reply.like.filter((like) => like.userId === userId)[0].id
    await prisma.commentReplyLike.delete({
      where: {
        id: likeId,
      },
    })
    return res.json({ replyUnliked: true })
  }
}

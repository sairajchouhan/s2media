import { Request, Response } from 'express'
import createError from 'http-errors'
import { createNotification } from '../utils/notifications'
import prisma from '../../prisma'
import { CommentReplyLike } from '@prisma/client'

export const likeOrUnlikeComment = async (req: Request, res: Response) => {
  const commentId = req.params.commentId
  const userId = req.user.uid
  const postId = req.params.postId

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      like: true,
      user: true,
    },
  })

  if (!comment) throw createError(404, 'Comment not found')
  const liked: boolean =
    comment.like.filter((like: CommentReplyLike) => like.userId === userId).length > 0

  if (!liked) {
    await prisma.commentReplyLike.create({
      data: {
        commentId,
        userId,
        postId,
      },
    })
    res.json({ commentLiked: true })

    const authUser = await prisma.user.findUnique({
      where: {
        uid: userId,
      },
    })

    if (comment.userId !== req.user.uid) {
      await createNotification({
        type: 'like_comment',
        post_id: postId,
        userIdWhoReceivesNotification: comment.userId,
        userWhoCausedNotification: authUser,
        isRead: false,
        meta: {
          commentText: comment.commentText,
        },
      })
    }

    return
  } else {
    const likeId = comment.like.filter((like: CommentReplyLike) => like.userId === userId)[0].id
    await prisma.commentReplyLike.delete({
      where: {
        id: likeId,
      },
    })
    res.json({ commentUnLiked: true })
    return
  }
}

export const likeOrUnlikeReply = async (req: Request, res: Response) => {
  console.log('Like or Unlike Reply')
  const replyId = req.params.replyId
  const userId = req.user.uid
  const postId = req.params.postId

  const reply = await prisma.reply.findUnique({
    where: {
      id: replyId,
    },
    include: {
      like: true,
      user: true,
    },
  })

  if (!reply) throw createError(404, 'Comment not found')
  const liked: boolean =
    reply.like.filter((like: CommentReplyLike) => like.userId === userId).length > 0

  if (!liked) {
    await prisma.commentReplyLike.create({
      data: {
        replyId,
        userId,
        postId,
      },
    })
    res.json({ replyLiked: true })
    const authUser = await prisma.user.findUnique({
      where: {
        uid: req.user.uid,
      },
    })

    if (reply.userId !== req.user.uid) {
      await createNotification({
        type: 'like_reply',
        post_id: postId,
        userIdWhoReceivesNotification: reply.userId,
        userWhoCausedNotification: authUser,
        isRead: false,
        meta: {
          replyText: reply.replyText,
        },
      })
    }

    return
  } else {
    const likeId = reply.like.filter((like: CommentReplyLike) => like.userId === userId)[0].id
    await prisma.commentReplyLike.delete({
      where: {
        id: likeId,
      },
    })
    res.json({ replyUnliked: true })
    return
  }
}

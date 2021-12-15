import { Request, Response } from 'express'
import createError from 'http-errors'
import { redis } from '../config/redis'
import prisma from '../../prisma'
import { createNotification } from '../utils/notifications'

export const likeAndUnlikePost = async (req: Request, res: Response) => {
  const postId = req.params.postId
  const userId = req.user.uid
  const authUser = await prisma.user.findUnique({
    where: {
      uid: req.user.uid,
    },
    include: {
      profile: {
        select: {
          displayName: true,
        },
      },
    },
  })

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      like: true,
      user: true,
    },
  })

  if (!authUser) throw createError(404, 'User not found')
  if (!post) throw createError(404, 'post not found')

  const liked: boolean = post.like.filter((like: any) => like.userId === userId).length > 0

  if (!liked) {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
      include: {
        post: true,
      },
    })
    res.json({ liked: true })
    if (post.userId !== req.user.uid) {
      await createNotification({
        type: 'like_post',
        post_id: postId,
        userIdWhoReceivesNotification: post.userId,
        userWhoCausedNotification: authUser,
        isRead: false,
      })
    }

    return
  } else {
    const likeId = post.like.filter((like: any) => like.userId === userId)[0].id
    await prisma.like.delete({
      where: {
        id: likeId,
      },
    })
    res.json({ unliked: true })
    await redis.publish('NOTI', `${req.user.email} unliked some post`)
    return
  }
}

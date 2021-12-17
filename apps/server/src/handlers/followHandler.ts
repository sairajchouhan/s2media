import { Request, Response } from 'express'
import createError from 'http-errors'
import { createNotification } from '../utils/redis'
import prisma from '../../prisma'

export const followUser = async (req: Request, res: Response) => {
  const userId = req.params.userId

  if (req.user.uid === userId) throw createError(400, 'Cannot follow yourself')

  const authUser = await prisma.user.findUnique({
    where: {
      uid: req.user.uid,
    },
    include: {
      following: true,
    },
  })

  const otherUser = await prisma.user.findUnique({
    where: {
      uid: userId,
    },
    include: {
      profile: {
        select: {
          displayName: true,
        },
      },
    },
  })

  if (!authUser) throw createError(400, 'User does not exist')
  if (!otherUser) throw createError(400, 'User does not exist')

  const userFollowing = authUser.following.filter((unit) => userId === unit.followedId)

  if (userFollowing.length === 0) {
    await prisma.follow.create({
      data: {
        followedId: userId,
        followerId: req.user.uid,
      },
    })

    res.json({ message: 'followed' })
    await createNotification({
      type: 'follow',
      userIdWhoReceivesNotification: otherUser.uid,
      userWhoCausedNotification: authUser,
      isRead: false,
      meta: {
        displayName: otherUser.username,
      },
    })

    return
  } else {
    const deleteId = userFollowing[0].id
    await prisma.follow.delete({
      where: {
        id: deleteId,
      },
    })

    res.json({ message: 'unfollowed' })
    return
  }
}

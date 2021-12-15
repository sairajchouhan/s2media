import { Follow } from '@prisma/client'
import { Request, Response } from 'express'
import createError from 'http-errors'
import prisma from '../../prisma'

export const followUser = async (req: Request, res: Response) => {
  const userId = req.params.userId

  if (req.user.uid === userId) throw createError(400, 'Cannot follow yourself')

  const user = await prisma.user.findUnique({
    where: {
      uid: req.user.uid,
    },
    include: {
      following: true,
    },
  })

  if (!user) throw createError(400, 'User does not exist')

  const userFollowing = user.following.filter((unit: Follow) => userId === unit.followedId)

  if (userFollowing.length === 0) {
    await prisma.follow.create({
      data: {
        followedId: userId,
        followerId: req.user.uid,
      },
    })

    res.json({ message: 'followed' })
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

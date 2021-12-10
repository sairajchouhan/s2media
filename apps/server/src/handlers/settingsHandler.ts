import { Request, Response } from 'express'
import createError from 'http-errors'
import { redis } from '../config/redis'
import prisma from '../../prisma'

export const toggleProfileType = async (req: Request, res: Response) => {
  const userId = req.user.uid
  const user = await prisma.user.findUnique({
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

  if (!user) {
    throw createError(404, 'User not found')
  }

  if (user.profileType === 'PUBLIC') {
    const userUpdated = await prisma.user.update({
      where: {
        uid: userId,
      },
      data: {
        profileType: 'PRIVATE',
      },
    })

    await redis.set(`user:${user.username.toUpperCase()}`, JSON.stringify(user))
    res.json({ user: userUpdated })
    return
  }

  if (user.profileType === 'PRIVATE') {
    const userUpdated = await prisma.user.update({
      where: {
        uid: userId,
      },
      data: {
        profileType: 'PUBLIC',
      },
    })
    res.json({ user: userUpdated })
    await redis.set(`user:${user.username.toUpperCase()}`, JSON.stringify(user))
    return
  }

  res.status(400).json({ message: 'something went wrong' })
  return
}

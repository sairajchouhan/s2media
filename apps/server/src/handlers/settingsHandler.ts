import { Request, Response } from 'express'
import createError from 'http-errors'
import prisma from '../../prisma'

export const toggleProfileType = async (req: Request, res: Response) => {
  const userId = req.user.uid
  const user = await prisma.user.findUnique({
    where: {
      uid: userId,
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
    return
  }

  res.status(400).json({ message: 'something went wrong' })
  return
}

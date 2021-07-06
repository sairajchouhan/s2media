import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import createError from 'http-errors'
import prisma from '../../prisma'

export const followUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const userId = req.params.userId

  if (req.user.id === userId) throw createError(400, 'Cannot follow yourself')

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      following: true,
    },
  })

  if (!user) throw createError(400, 'User does not exist')

  const userFollowing = user.following.filter((unit) => userId === unit.followedId)

  if (userFollowing.length === 0) {
    await prisma.follow.create({
      data: {
        followedId: userId,
        followerId: req.user.id,
      },
    })

    return res.json({ msg: 'followd' })
  } else {
    const deleteId = userFollowing[0].id
    await prisma.follow.delete({
      where: {
        id: deleteId,
      },
    })

    return res.json({ msg: 'unfollowed' })
  }
}

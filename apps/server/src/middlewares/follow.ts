import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/'

export default async (req: Request, res: Response, next: NextFunction) => {
  req.canViewFullProfile = true
  const authUser = req.user
  const profileUserUsername = req.params.username

  const profileUser = await prisma.user.findUnique({
    where: {
      username: profileUserUsername,
    },
    include: {
      followers: true,
    },
  })

  if (!profileUser) {
    return res.status(404).json({
      message: 'user not found',
    })
  }

  if (authUser.uid === profileUser.uid) {
    return next()
  }

  const isPublicProfile = profileUser.profileType === 'PUBLIC'
  if (isPublicProfile) {
    return next()
  }

  if (profileUser.followers.some((follower) => follower.followerId === authUser.uid)) {
    return next()
  }

  req.canViewFullProfile = false
  return next()
}

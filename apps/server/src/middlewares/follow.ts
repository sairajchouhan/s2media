import { NextFunction, Request, Response } from 'express'
import prisma from '../../prisma/'

export default async (req: Request, res: Response, next: NextFunction) => {
  req.canViewPrivateInfo = true
  const authUser = req.user
  const profileUserUsername = req.params.username
  const postToProtect = req.params.postId

  if (profileUserUsername) {
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

    if (profileUser.followers.some((follower: any) => follower.followerId === authUser.uid)) {
      return next()
    }

    req.canViewPrivateInfo = false
    return next()
  }

  if (postToProtect) {
    const post = await prisma.post.findUnique({
      where: {
        id: postToProtect,
      },
      include: {
        user: {
          include: {
            followers: true,
          },
        },
      },
    })

    if (!post) {
      return res.status(404).json({
        message: 'post not found',
      })
    }

    if (post.user.uid === authUser.uid) {
      return next()
    }
    const isPublicProfile = post.user.profileType === 'PUBLIC'
    if (isPublicProfile) {
      return next()
    }

    if (post.user.followers.some((follower: any) => follower.followerId === authUser.uid)) {
      return next()
    }

    req.canViewPrivateInfo = false
    return res.status(403).json({
      message: 'Private account cannot access',
    })
  }

  return next()
}

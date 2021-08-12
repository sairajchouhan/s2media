import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import createError from 'http-errors'
import prisma from '../../prisma'

export const getAllUsers = async (_req: Request, res: Response) => {
  const data = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      username: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      profile: true,
    },
  })
  res.send(data)
}

export const getAuthUserInfo = async (req: Request, res: Response) => {
  console.log(req.user.uid)

  const user = await prisma.user.findUnique({
    where: {
      id: req.user.uid,
    },
    include: {
      profile: true,
      followers: true,
      following: true,
      post: {
        include: {
          like: true,
          comment: true,
        },
      },
    },
  })

  if (!user) {
    throw createError(403, 'User not found')
  }

  res.send(user)
}

export const updateProfile = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const { bio, displayName } = req.body
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.uid,
    },
    include: {
      profile: true,
    },
  })

  if (!user) {
    throw createError(403, 'User not found')
  }
  if (!user.profile) {
    const profile = await prisma.profile.create({
      data: {
        bio,
        displayName,
        userId: user.id,
      },
    })
    return res.json(profile)
  }

  const updateObj: { bio: string; displayName: string } | Record<string, string> = {}

  if (bio) {
    updateObj.bio = bio
  }
  if (displayName) {
    updateObj.displayName = displayName
  }

  const profile = await prisma.profile.update({
    where: {
      id: user.profile.id,
    },
    data: {
      ...updateObj,
    },
  })

  return res.json(profile)
}

export const getUserInfo = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }
  const id = req.params.userId

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      profile: true,
    },
  })

  if (!user) {
    throw createError(403, 'User not found')
  }

  return res.json(user)
}

export const getAllPostsOfUser = async (req: Request, res: Response) => {
  const id = req.params.userId
  const posts = await prisma.post.findMany({
    where: {
      userId: id,
    },
    include: {
      _count: { select: { like: true, comment: true } },
      user: {
        include: {
          profile: true,
        },
      },
      like: true,
      comment: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return res.json(posts)
}

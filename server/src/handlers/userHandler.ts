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
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      profile: true,
      followers: true,
      following: true,
      post: true,
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
      id: req.user.id,
    },
    include: {
      profile: {
        select: {
          id: true,
        },
      },
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
  const profile = await prisma.profile.update({
    where: {
      id: user.profile?.id,
    },
    data: {
      bio,
      displayName,
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

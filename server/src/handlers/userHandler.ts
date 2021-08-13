import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import createError from 'http-errors'
import prisma from '../../prisma'
import { get4RandomChars } from '../utils'

export const getAllUsers = async (_req: Request, res: Response) => {
  const data = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      uid: true,
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
  console.log(req.user.email)

  let user: any
  const includeObj = {
    _count: {
      select: {
        post: true,
        followers: true,
        following: true,
      },
    },
    profile: true,
  }

  user = await prisma.user.findUnique({
    where: {
      email: req.user.email,
    },
    include: includeObj,
  })

  if (!user) {
    const username = req.user.email.split('@')[0]

    user = await prisma.user.create({
      data: {
        uid: req.user.uid,
        email: req.user.email,
        username: `${username}_${get4RandomChars()}`,
        avatar: null,
        provider: req.user.firebase.sign_in_provider,
        profile: {
          create: {
            bio: null,
            displayName: username,
          },
        },
      },
      include: includeObj,
    })
    return res.status(201).json({
      redirect: '/home',
      user,
    })
  }

  return res.status(200).json({
    redirect: '/home',
    userFullDetials: user,
  })
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
      uid: req.user.uid,
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
        userId: user.uid,
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
  const uid = req.params.userId

  const user = await prisma.user.findUnique({
    where: {
      uid,
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

import { Request, Response } from 'express'
import createError from 'http-errors'
import prisma from '../../prisma'
import { cloudinaryUserProfileImageUpload } from '../config/cloudinary'
import { formatBufferTo64 } from '../config/data-uri'
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
  let user: any
  const includeObj = {
    _count: {
      select: {
        post: true,
        save: true,
        followers: true,
        following: true,
      },
    },
    profile: true,
    save: true,
    followers: true,
    following: true,
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
        avatar: req.user.picture ?? null,
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
      userFullDetials: user,
    })
  }

  if (user.provider !== req.user.firebase.sign_in_provider) {
    const updatedUser = await prisma.user.update({
      where: {
        email: req.user.email,
      },
      data: {
        provider: req.user.firebase.sign_in_provider,
        avatar: req.user.picture ?? null,
      },
      include: includeObj,
    })
    return res.status(201).json({ redirect: '/home', user: updatedUser })
  }

  return res.status(200).json({
    redirect: '/home',
    userFullDetials: user,
  })
}

export const updateProfile = async (req: Request, res: Response) => {
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

  const updateObj: Record<string, any> = {}

  if (bio) {
    updateObj.bio = bio
  }
  if (displayName) {
    updateObj.displayName = displayName
  }

  if (req.file) {
    const base64file = formatBufferTo64(req.file)
    const imageUploadRes = await cloudinaryUserProfileImageUpload(base64file.content as string)
    updateObj.user = {
      update: {
        avatar: imageUploadRes.secure_url,
      },
    }
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
  const username = req.params.username
  const canViewFullProfile = req.canViewPrivateInfo
  const includeObj = {
    _count: {
      select: {
        post: true,
        save: true,
        followers: true,
        following: true,
      },
    },
    profile: true,
    followers: canViewFullProfile,
    following: canViewFullProfile,
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    include: includeObj,
  })

  if (!user) {
    throw createError(403, 'User not found')
  }

  res.json({ user, canViewFullProfile })
}

export const getAllPostsOfUser = async (req: Request, res: Response) => {
  const username = (req.query.username as string) ?? undefined
  const likeBool = req.query.like ?? undefined
  const saveBool = req.query.save ?? undefined

  const where: Record<string, any> = {}

  if (username) {
    where.user = {}
    where.user.username = username
  }
  if (likeBool) {
    where['like'] = {
      some: {
        user: {
          username,
        },
      },
    }
  }
  if (saveBool) {
    where['save'] = {
      some: {
        user: {
          username,
        },
      },
    }
  }

  const posts = await prisma.post.findMany({
    where: where,
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: { select: { like: true, comment: true, reply: true } },
      like: true,
      comment: true,
      save: true,
      user: {
        include: {
          profile: true,
        },
      },
    },
  })

  return res.json({ posts })
}

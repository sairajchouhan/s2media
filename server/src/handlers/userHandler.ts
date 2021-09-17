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
  // console.log(req.user)
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
    console.log(user)
    return res.status(201).json({
      redirect: '/home',
      user,
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

  res.json(user)
}

export const getAllPostsOfUser = async (req: Request, res: Response) => {
  const id = req.params.userId
  const posts = await prisma.post.findMany({
    where: {
      userId: id,
    },
    include: {
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

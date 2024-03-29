import { Request, Response } from 'express'
import createError from 'http-errors'
import prisma from '../../prisma'
import { cloudinaryUserProfileImageUpload } from '../config/cloudinary'
import { formatBufferTo64 } from '../config/data-uri'
import { get4RandomChars } from '../utils'
import { redis } from '../config/redis'
import { createNotification, storeAllCombinationsOfUsername } from '../utils/redis'
import { v4 as uuid } from 'uuid'

const ttl = 24 * 60 * 60 * 30

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
  const cacheUser = await redis.get(`user:session:${req.user.uid}`)
  if (cacheUser) {
    res.status(200).json({
      redirect: '/home',
      userFullDetials: JSON.parse(cacheUser),
      isNewSignup: false,
    })
    return
  }

  let user: any

  user = await prisma.user.findUnique({
    where: {
      uid: req.user.uid,
    },
    include: {
      profile: {
        select: {
          displayName: true,
        },
      },
    },
  })

  if (user) {
    res.status(200).json({
      redirect: '/home',
      userFullDetials: user,
      isNewSignup: false,
    })
    return
  }

  // if user signs up with google eventhough he has email/pass account
  // already in firebase then this will update the user's avatar
  if (user && user.provider !== req.user.firebase.sign_in_provider) {
    const updatedUser = await prisma.user.update({
      where: {
        email: req.user.email,
      },
      data: {
        provider: req.user.firebase.sign_in_provider,
        avatar: req.user.picture ?? null,
      },
    })
    console.log(200000)
    res.status(201).json({ redirect: '/home', user: updatedUser, isNewSignup: false })
    await redis.set(`user:${user.username.toUpperCase()}`, JSON.stringify(user))
    await storeAllCombinationsOfUsername(user.username)

    return
  }

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
    include: {
      profile: {
        select: {
          displayName: true,
        },
      },
    },
  })

  res.status(200).json({
    redirect: '/home',
    userFullDetials: user,
    isNewSignup: true,
  })

  await redis.setex(`user:session:${req.user.uid}`, ttl, JSON.stringify(user))
  await redis.set(`user:${user.username.toUpperCase()}`, JSON.stringify(user))
  await storeAllCombinationsOfUsername(user.username)
  await createNotification({
    isRead: false,
    type: 'user_sign_up',
    userIdWhoReceivesNotification: req.user.uid,
    userWhoCausedNotification: 's2media',
    id: uuid(),
    timestamp: new Date(),
    meta: {
      user,
    },
  })
}

export const deleteAuthUserCache = async (req: Request, res: Response) => {
  redis.del(`user:session:${req.user.uid}`, (error, resp) => {
    if (error) {
      console.log(error.name)
      console.error(error.message)
      console.log(error.stack)
    }
    console.log(resp)
  })

  res.send('OK')
}

//!
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
    res.json(profile)
    return
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

  const updatedRedisUser = {
    ...user,
    profile: {
      displayName: profile.displayName,
    },
  }

  console.log(updatedRedisUser)
  await redis.set(`user:${user.username.toUpperCase()}`, JSON.stringify(updatedRedisUser))
  res.json(profile)
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
    save: true,
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

  if (username && !likeBool && !saveBool) {
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

  res.json({ posts })
}

export const getFollowersOfUser = async (req: Request, res: Response) => {
  const username = req.params.username

  if (!req.canViewPrivateInfo) {
    res.status(403).json({ message: 'You are not authorized to view this information' })
    return
  }

  const data = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      followers: {
        take: 10,
        include: {
          follower: {
            include: {
              profile: {
                select: {
                  displayName: true,
                },
              },
            },
          },
        },
        select: undefined,
      },
    },
  })

  if (!data) {
    res.json(400).end('User not found')
    return
  }

  type Follower = typeof data.followers[number]

  const followers = data.followers.map((follower: Follower) => follower.follower)

  res.json({ followers })
}

export const getFollowingOfUser = async (req: Request, res: Response) => {
  const username = req.params.username

  if (!req.canViewPrivateInfo) {
    res.status(403).json({ message: 'You are not authorized to view this information' })
    return
  }

  const data = await prisma.user.findUnique({
    where: {
      username,
    },
    include: {
      following: {
        take: 10,
        include: {
          followed: {
            include: {
              profile: {
                select: {
                  displayName: true,
                },
              },
            },
          },
        },
        select: undefined,
      },
    },
  })

  if (!data) {
    res.json(400).end('User not found')
    return
  }

  type Following = typeof data.following[number]

  const following = data.following.map((following: Following) => following.followed)

  res.json({ following })
  return
}

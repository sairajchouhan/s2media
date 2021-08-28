import { Request, Response } from 'express'
import createError from 'http-errors'
import prisma from '../../prisma/'
import { cloudinaryPostImageUpload } from '../config/cloudinary'
import { formatBufferTo64 } from '../config/data-uri'
import { commentAndReplyUser } from './helpers'

export const createPost = async (req: Request, res: Response) => {
  const { caption }: { caption: string } = req.body

  if (!req.file) {
    throw createError(404, 'Post does not exist')
  }

  const base64file = formatBufferTo64(req.file)
  const imageUploadRes = await cloudinaryPostImageUpload(base64file.content as string)

  const createdPost = await prisma.post.create({
    data: {
      url: imageUploadRes.secure_url,
      caption: caption,
      userId: req.user.uid,
    },
  })

  return res.send(createdPost)
}

export const allPosts = async (req: Request, res: Response) => {
  const userId = (req.query.userId as string) ?? undefined
  const likeBool = req.query.like ?? undefined
  const saveBool = req.query.save ?? undefined

  const where: Record<string, any> = {}

  if (userId) {
    where.userId = userId
  }
  if (likeBool) {
    where['like'] = { some: {} }
  }
  if (saveBool) {
    where['save'] = { some: {} }
  }

  const posts = await prisma.post.findMany({
    where: where,
    take: 10,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: { select: { like: true, comment: true, save: true } },
      like: true,
      comment: true,
      save: true,
      user: {
        include: {
          _count: {
            select: {
              followers: true,
              following: true,
            },
          },
          profile: true,
        },
      },
    },
  })
  return res.json(posts)
}

export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.postId
  const { url, caption } = req.body

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw createError(404, 'Post does not exist')
  }
  if (post.userId !== req.user.uid) {
    throw createError(403, 'Unauthorized')
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      url,
      caption,
    },
  })

  return res.json(updatedPost)
}

export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.postId

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw createError(404, 'Post does not exist')
  }

  if (post.userId !== req.user.uid) {
    throw createError(403, 'Unauthorized')
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  })

  return res.json({ message: 'Post deleted successfully' })
}

export const getPostById = async (req: Request, res: Response) => {
  const postId = req.params.postId
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      _count: { select: { like: true, comment: true, reply: true } },
      like: true,
      comment: {
        include: {
          reply: {
            include: {
              repliedToUser: commentAndReplyUser,
              user: commentAndReplyUser,
            },
          },
          user: commentAndReplyUser,
        },
      },
      save: true,
      user: {
        include: {
          profile: true,
        },
      },
    },
  })
  if (!post) {
    throw createError(400, 'Post not found')
  }

  return res.json(post)
}

import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import createError from 'http-errors'
import prisma from '../../prisma/'

export const createPost = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const { url, caption } = req.body
  const createdPost = await prisma.post.create({
    data: {
      url: url,
      caption: caption,
      userId: req.user.id,
    },
  })

  return res.send(createdPost)
}

export const allPosts = async (_: Request, res: Response) => {
  const posts = await prisma.post.findMany({
    include: {
      _count: { select: { like: true } },
    },
  })
  res.json(posts)
}

export const updatePost = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

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
  if (post.userId !== req.user.id) {
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
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const postId = req.params.postId as never

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })

  if (!post) {
    throw createError(404, 'Post does not exist')
  }

  if (post.userId !== req.user.id) {
    throw createError(403, 'Unauthorized')
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  })

  return res.json({ message: 'Post deleted successfully' })
}

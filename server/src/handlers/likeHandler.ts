import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import prisma from '../../prisma'
import createError from 'http-errors'

export const likeAndUnlikePost = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const postId: number = req.params.postId as never
  const userId = req.user.id

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      like: true,
    },
  })

  if (!post) throw createError(404, 'post not found')

  const liked: boolean = post.like.filter((like) => like.userId === userId).length > 0

  if (!liked) {
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
      include: {
        post: true,
      },
    })

    const resp = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        _count: {
          select: { like: true },
        },
      },
    })

    return res.json(resp)
  } else {
    const likeId = post.like.filter((like) => like.userId === userId)[0].id
    await prisma.like.delete({
      where: {
        id: likeId,
      },
    })
    const resp = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        _count: {
          select: { like: true },
        },
      },
    })

    return res.json(resp)
  }
}

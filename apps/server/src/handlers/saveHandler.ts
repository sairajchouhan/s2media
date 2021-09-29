import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import createError from 'http-errors'
import prisma from '../../prisma'

export const saveAndUnsavePost = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const postId = req.params.postId
  const userId = req.user.uid

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      save: true,
    },
  })

  if (!post) throw createError(404, 'post not found')

  const saved: boolean = post.save.filter((save) => save.userId === userId).length > 0

  if (!saved) {
    await prisma.save.create({
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
          select: { save: true },
        },
      },
    })

    return res.json(resp)
  } else {
    const saveId = post.save.filter((save) => save.userId === userId)[0].id

    await prisma.save.delete({
      where: {
        id: saveId,
      },
    })
    const resp = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        _count: {
          select: { save: true },
        },
      },
    })

    return res.json(resp)
  }
}

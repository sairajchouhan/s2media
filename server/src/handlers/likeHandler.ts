import { Request, Response } from 'express'
import createError from 'http-errors'
import prisma from '../../prisma'

export const likeAndUnlikePost = async (req: Request, res: Response) => {
  const postId = req.params.postId
  const userId = req.user.uid

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
    return res.json({ liked: true })
  } else {
    const likeId = post.like.filter((like) => like.userId === userId)[0].id
    await prisma.like.delete({
      where: {
        id: likeId,
      },
    })

    return res.json({ unliked: true })
  }
}

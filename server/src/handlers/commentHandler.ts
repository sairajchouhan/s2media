import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import createError from 'http-errors'
import prisma from '../../prisma'

export const getCommentsOfPost = async (req: Request, res: Response) => {
  const postId = req.params.postId
  const comments = await prisma.comment.findMany({
    where: { post: { id: postId } },
    include: {
      user: {
        select: {
          avatar: true,
          username: true,
          profile: {
            select: {
              displayName: true,
            },
          },
        },
      },
      reply: true,
    },
  })
  res.json({ comments })
}

export const createComment = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }
  const { commentText } = req.body
  const postId = req.params.postId
  const userId = req.user.uid

  const comment = await prisma.comment.create({
    data: {
      commentText,
      userId,
      postId,
    },
  })

  console.log(comment)
  return res.json(comment)
}

export const editComment = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const postId = req.params.postId
  const commentId = req.params.commentId
  const userId = req.user.uid
  const { commentText } = req.body

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })
  if (!post) throw createError(404, 'Post does not exist')

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  })

  if (!comment) throw createError(404, 'Comment does not exist')
  if (comment.userId !== userId) throw createError(403, 'Unauthroised')

  const editedComment = await prisma.comment.update({
    where: { id: commentId },
    data: {
      commentText,
    },
  })

  return res.json(editedComment)
}

export const deleteComment = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const postId = req.params.postId
  const commentId = req.params.commentId
  const userId = req.user.uid

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  })
  if (!post) throw createError(404, 'Post does not exist')

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  })

  if (!comment) throw createError(404, 'Comment does not exist')
  if (comment.userId !== userId) throw createError(403, 'Unauthroised')

  await prisma.comment.delete({
    where: { id: commentId },
  })

  return res.json({ msg: 'Comment deleted successfully' })
}

export const getOneComment = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  // const postId = req.params.postId
  const commentId = req.params.commentId

  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
    include: {
      reply: true,
    },
  })

  return res.json({ comment })
}

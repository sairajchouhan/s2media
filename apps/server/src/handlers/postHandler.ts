import { Request, Response } from 'express'
import createError from 'http-errors'
import prisma from '../../prisma/'
import { cloudinary, cloudinaryPostImageUpload } from '../config/cloudinary'
import { formatBufferTo64 } from '../config/data-uri'

export const createPost = async (req: Request, res: Response) => {
  const { caption }: { caption: string } = req.body

  if ((!caption || caption.trim() === '') && !req.file) {
    throw createError(400, 'Invalid post data')
  }

  if (caption && caption.length > 300) {
    throw createError(400, 'Caption must be less than 300 characters')
  }

  const data: any = { caption, userId: req.user.uid }

  if (req.file) {
    const base64file = formatBufferTo64(req.file)
    const imageUploadRes = await cloudinaryPostImageUpload(base64file.content as string)
    data.url = imageUploadRes.secure_url
    data.imagePublicId = imageUploadRes.public_id
  }

  console.log(data)

  const createdPost = await prisma.post.create({
    data,
  })

  res.send(createdPost)
}

const postCount = 10
export const allPosts = async (req: Request, res: Response) => {
  const cursor = (req.query.cursor as string) || undefined
  const cursorObj = cursor ? { id: cursor } : undefined
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      _count: { select: { like: true, comment: true, reply: true } },
      like: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      comment: true,
      // save: true,
      user: {
        include: {
          profile: {
            select: {
              displayName: true,
            },
          },
        },
      },
    },
    where: {
      user: {
        NOT: {
          profileType: 'PRIVATE',
        },
      },
    },
    skip: cursor ? 1 : 0,
    cursor: cursorObj,
    take: postCount,
  })
  res.json({
    posts,
    nextCursor: posts[postCount - 1]?.id ?? undefined,
  })
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

  res.json(updatedPost)
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

  await prisma.like.deleteMany({
    where: {
      postId,
    },
  })

  await prisma.commentReplyLike.deleteMany({
    where: {
      postId,
    },
  })

  await prisma.save.deleteMany({
    where: {
      postId,
    },
  })
  await prisma.reply.deleteMany({
    where: {
      postId,
    },
  })

  await prisma.comment.deleteMany({
    where: {
      postId,
    },
  })

  await prisma.post.delete({
    where: {
      id: postId,
    },
  })

  if (post.imagePublicId) {
    await cloudinary.api.delete_resources([post.imagePublicId])
  }

  res.json({ message: 'Post deleted successfully' })
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

  res.json(post)
}

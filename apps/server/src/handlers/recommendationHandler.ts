import { Request, Response } from 'express'
import { getRandomNumberInRange } from '../utils'
import prisma from '../../prisma'

export const getFollowRecommendations = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    take: 50,
    include: {
      profile: {
        select: {
          displayName: true,
        },
      },
    },
  })

  const randomNumber = getRandomNumberInRange(0, users.length)
  const randomUsers = users.slice(randomNumber, randomNumber + 5)

  res.json({ users: randomUsers })
}

export const recentSignUpUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    take: 6,
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      profile: {
        select: {
          displayName: true,
        },
      },
    },
    where: {
      NOT: {
        email: req.user.email,
      },
    },
  })
  res.json({ users })
}

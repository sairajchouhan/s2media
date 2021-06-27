import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import createError from 'http-errors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import prisma from '../../prisma'

export const register = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    })
  }

  const { email, username, password } = req.body
  const oldUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: {
            equals: username,
          },
        },
        {
          email: {
            equals: email,
          },
        },
      ],
    },
  })

  if (oldUser) {
    throw createError(400, 'user already exists')
  }

  const userData = { username, email, password }
  const salt = await bcrypt.genSalt(12)
  userData.password = await bcrypt.hash(password, salt)

  const user = await prisma.user.create({
    data: userData,
  })

  if (!user) {
    throw createError(500, 'something went wrong, Try again')
  }

  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
    },
  })
  console.log(`profile is created`, profile)

  const payload = { id: user.id, username: user.username, email: user.email }
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '365d' })

  return res.send({ token })
}

export const login = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: [{ msg: 'invalid credentials' }],
    })
  }

  const { email, password } = req.body
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    throw createError(400, 'user does not exist')
  }
  const isMatch = await bcrypt.compare(password, user.password)

  console.log(isMatch)

  if (!isMatch) {
    return res.status(400).json({
      errors: [{ msg: 'invalid credentials' }],
    })
  }

  const payload = { id: user.id, username: user.username, email: user.email }
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '365d' })

  return res.json({ token })
}

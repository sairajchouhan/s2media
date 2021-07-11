import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
// import createError from 'http-errors'
import createError from 'http-errors'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../prisma'

// export const register = async (req: Request, res: Response) => {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: errors.array(),
//     })
//   }

//   const { email, username, password } = req.body
//   const oldUser = await prisma.user.findFirst({
//     where: {
//       OR: [
//         {
//           username: {
//             equals: username,
//           },
//         },
//         {
//           email: {
//             equals: email,
//           },
//         },
//       ],
//     },
//   })

//   if (oldUser) {
//     throw createError(400, 'user already exists')
//   }

//   const userData = { username, email, password }
//   const salt = await bcrypt.genSalt(12)
//   userData.password = await bcrypt.hash(password, salt)

//   const user = await prisma.user.create({
//     data: userData,
//   })

//   if (!user) {
//     throw createError(500, 'something went wrong, Try again')
//   }

//   const profile = await prisma.profile.create({
//     data: {
//       userId: user.id,
//     },
//   })
//   console.log(`profile is created`, profile)

//   const payload = { id: user.id, username: user.username, email: user.email }
//   const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '365d' })

//   return res.send({ token })
// }

// export const login = async (req: Request, res: Response) => {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     return res.status(400).json({
//       errors: [{ msg: 'invalid credentials' }],
//     })
//   }

//   const { email, password } = req.body
//   const user = await prisma.user.findUnique({
//     where: {
//       email,
//     },
//   })

//   if (!user) {
//     throw createError(400, 'user does not exist')
//   }
//   const isMatch = await bcrypt.compare(password, user.password)

//   console.log(isMatch)

//   if (!isMatch) {
//     return res.status(400).json({
//       errors: [{ msg: 'invalid credentials' }],
//     })
//   }

//   const payload = { id: user.id, username: user.username, email: user.email }
//   const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '365d' })

//   return res.json({ token })
// }

export const getToken = async (req: Request, res: Response) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: [errors.array()],
    })
  }
  const {
    email,
    username,
    avatar,
    displayName,
  }: {
    email: string
    username: string
    avatar: string
    displayName: string
  } = req.body

  console.log(req.body)

  let user: any

  user = await prisma.user.findFirst({
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
    include: {
      profile: true,
    },
  })

  if (user && (user.username !== username || user.email !== email)) {
    throw createError(400, 'dont mess with me')
  }

  if (!user) {
    let cleanUsername = username.toLowerCase()
    cleanUsername = cleanUsername.split(' ').join('')
    console.log(cleanUsername)
    user = await prisma.user.create({
      data: {
        email,
        username: cleanUsername,
        avatar,
        profile: {
          create: {
            bio: null,
            displayName,
          },
        },
      },
      include: {
        profile: true,
      },
    })
  }

  console.log(user)

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    displayName: user.profile.displayName,
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '30d' })
  return res.json({ ...user, token })
}

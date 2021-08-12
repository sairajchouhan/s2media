import { NextFunction, Request, Response } from 'express'
import fbadmin from 'firebase-admin'

export default async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization')
  console.log(authorization)

  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(401).json({
      status: 401,
      message: 'authorization denied',
    })
  }

  const idToken = authorization.split(' ')[1]
  if (!idToken) {
    return res.status(401).json({
      status: 401,
      message: 'authorization denied',
    })
  }

  try {
    const decodedToken = await fbadmin.auth().verifyIdToken(idToken)
    req.user = decodedToken
    return next()
  } catch (err) {
    console.log(err.message)
    return res.status(401).json({
      status: 401,
      message: 'authorization denied',
    })
  }
}

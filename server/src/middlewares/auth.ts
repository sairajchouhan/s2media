import { NextFunction, Request, Response } from 'express'
import fbadmin from 'firebase-admin'
import { DecodedIdToken } from '../types/index'

export default async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization')
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
    req.user = decodedToken as DecodedIdToken
    return next()
  } catch (err) {
    console.log(err.message)
    return res.status(401).json({
      status: 401,
      message: 'authorization denied',
    })
  }
}

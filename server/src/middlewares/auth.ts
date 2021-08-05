import { NextFunction, Request, Response } from 'express'
import fbadmin from 'firebase-admin'

export default async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization')

  if (!authorization) {
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
    console.log(decodedToken)
    req.user = decodedToken as any
    return next()
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: 'authorization denied',
    })
  }
}

import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPaylod } from '../types'

export default (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization')

  if (!authorization) {
    return res.status(401).json({
      status: 401,
      message: 'authorization denied',
    })
  }
  const token = authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'authorization denied',
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    req.user = decoded as JwtPaylod
    return next()
  } catch (err) {
    return res.status(401).json({
      status: 401,
      message: 'authorization denied',
    })
  }
}

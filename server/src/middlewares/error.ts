import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'

// custom handler hould have four arguments as per docs but es-lint is yelling
// eslint-disable-next-line no-unused-vars
const errorHandler = (err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  console.log(err)
  res.status(err.status || 500)
  res.json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  })
}

export default errorHandler

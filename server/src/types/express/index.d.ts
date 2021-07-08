/* eslint-disable no-unused-vars */
declare namespace Express {
  interface Request {
    user: { id: string; username: string; email: string; avatar: string }
    file: any
  }
}

/* eslint-disable no-unused-vars */

declare namespace Express {
  interface Request {
    user: {
      aud: string
      auth_time: number
      email: string
      email_verified?: boolean
      exp: number
      iat: number
      iss: string
      phone_number?: string
      picture?: string
      sub: string
      uid: string
      firebase: {
        identities: {
          [key: string]: any
        }
        sign_in_provider: string
        sign_in_second_factor?: string
        second_factor_identifier?: string
        tenant?: string
        [key: string]: any
      }
    }
  }
}

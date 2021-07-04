import jwt from 'jsonwebtoken'
import { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Providers from 'next-auth/providers'

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options: NextAuthOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  debug: true,
  callbacks: {
    async signIn(user: any, account: any, profile: any) {
      const myUser = {
        username: profile.name,
        email: profile.email,
        avatar: profile.picture,
        // provider: account.provider,
      } as any

      const rawResponse = await fetch('http://localhost:5000/api/v1/auth/gettoken', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(myUser),
      })
      const response = await rawResponse.json()
      if (Object.keys(response).includes('errors')) return false
      else user.accessToken = response.token
      return true
    },
    async jwt(token: any, user: any) {
      if (user) {
        token = { accessToken: user.accessToken }
      }
      return token
    },
    async session(session: any, token: any) {
      const decoded = jwt.verify(token.accessToken, process.env.JWT_SECRET!) as any
      const mySession = {
        ...decoded,
        accessToken: token.accessToken,
      }
      return decoded ? mySession : null
    },
  },
}

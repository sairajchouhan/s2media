import 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    accessToken: string
    avatar: string
    email: string
    exp: number
    iat: number
    id: string
    username: string
    displayName: string
  }
}

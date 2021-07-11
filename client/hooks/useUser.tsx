import { useSession } from 'next-auth/client'
import { SessionUser } from '../types/user'

export const useUser = () => {
  const [session] = useSession()
  if (!session) return null
  const sessionUser: SessionUser = {
    accessToken: session.accessToken,
    avatar: session.avatar,
    email: session.email,
    id: session.id,
    username: session.username,
    displayName: session.displayName,
  }
  return sessionUser
}

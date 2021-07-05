import { useSession } from 'next-auth/client'

export const useUser = () => {
  const [session] = useSession()
  if (!session) return null
  else
    return {
      ...session,
    }
}

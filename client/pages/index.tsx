import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function Landing() {
  const [session] = useSession()
  const { back } = useRouter()

  if (session) {
    back()
    return null
  }

  return <> bro this is index page</>
}

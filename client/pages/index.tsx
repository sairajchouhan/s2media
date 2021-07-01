import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function Landing() {
  const [session] = useSession()
  const { push } = useRouter()

  if (session) {
    push('/home')
    return null
  }

  return <> bro this is index page</>
}

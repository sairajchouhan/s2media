import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function Landing() {
  const [session, loading] = useSession()
  const { back } = useRouter()

  return <> bro this is index page</>
}

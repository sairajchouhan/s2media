import { signIn, signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function Landing() {
  const [session, loading] = useSession()
  const { push } = useRouter()

  if (loading) return null

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button className="px-5 py-2 text-white bg-indigo-500" onClick={() => signIn()}>
            Sign in
          </button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user?.email} <br />
          <button
            className="px-5 py-2 text-white bg-indigo-500"
            onClick={async () => {
              const data = await signOut({ redirect: false, callbackUrl: '/' })
              push(data.url)
            }}
          >
            Sign out
          </button>
        </>
      )}
    </>
  )
}

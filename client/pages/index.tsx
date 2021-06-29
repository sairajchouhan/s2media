import { getSession, signIn, signOut, useSession } from 'next-auth/client'

export default function Landing() {
  const [session, loading] = useSession()

  console.log(session)

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
          <button className="px-5 py-2 bg-indigo-500" onClick={() => signOut()}>
            Sign out
          </button>
        </>
      )}
    </>
  )
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      session: await getSession(context),
    },
  }
}

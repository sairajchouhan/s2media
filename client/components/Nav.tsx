import { signIn, signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

interface NavProps {}
const Nav = (_props: NavProps) => {
  const [session, loading] = useSession()
  console.log(loading)

  return (
    <div className="w-full bg-blue-50 h-14">
      <div className="flex items-center justify-between h-full px-20">
        <div className="text-2xl font-bold">
          <Link href="/">
            <a>S2Media</a>
          </Link>
        </div>
        <ul className="flex items-center h-full">
          {session ? (
            <>
              <li className="cursor-pointer">
                <a className="mr-6">{JSON.stringify(session)}</a>
              </li>
              <li onClick={() => signOut()} className="cursor-pointer">
                <Link href="/api/auth/signout">
                  <a className="">Logout</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li
                onClick={() => {
                  signIn('google', { callbackUrl: 'http://localhost:3000/home' })
                }}
                className="px-5 py-2 text-white transition bg-purple-600 rounded-lg cursor-pointer hover:bg-purple-500"
              >
                <a>Login</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
export default Nav

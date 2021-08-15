import Link from 'next/link'

interface NavProps {}
const Nav = (_props: NavProps) => {
  return (
    <div className="w-full bg-blue-50 h-14">
      <div className="flex items-center justify-between h-full px-20">
        <div className="text-2xl font-bold">
          <Link href="/">
            <a>S2Media</a>
          </Link>
        </div>
        <ul className="flex items-center h-full">
          {false ? (
            <>
              <li className="cursor-pointer">
                <Link href="/api/auth/signout">
                  <a className="">Logout</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="px-5 py-2 mr-4 text-white transition bg-purple-600 rounded-lg cursor-pointer hover:bg-purple-500">
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li className="px-5 py-2 text-white transition bg-purple-600 rounded-lg cursor-pointer hover:bg-purple-500">
                <Link href="/signup">
                  <a>Signup</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
export default Nav

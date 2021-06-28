import Link from 'next/link'
interface NavProps {}
const Nav = (_props: NavProps) => {
  return (
    <div className="bg-blue-50 w-full h-14">
      <div className="flex h-full items-center justify-between px-20">
        <div className="text-2xl font-bold">
          <Link href="/">
            <a>S2Media</a>
          </Link>
        </div>
        <ul className="flex h-full  items-center">
          <li className="cursor-pointer">
            <Link href="/signup">
              <a className="mr-6">Signup</a>
            </Link>
          </li>
          <li className="bg-purple-600 transition hover:bg-purple-500 px-5 py-2 cursor-pointer rounded-lg text-white">
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Nav

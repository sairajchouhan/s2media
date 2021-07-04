import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Home from '../assets/svgs/home.svg'
import Logout from '../assets/svgs/logout.svg'
import Message from '../assets/svgs/message.svg'
import Profile from '../assets/svgs/profile.svg'
import Saved from '../assets/svgs/saved.svg'
import Settings from '../assets/svgs/settings.svg'
import BrandLogo from './atoms/LeftNavBrand/left-nav-brand'

const LeftNav = () => {
  const { push } = useRouter()
  const [session] = useSession()

  return (
    <nav className="flex flex-col h-screen max-h-screen bg-white w-72">
      <BrandLogo
        onClick={() => {
          if (session) push('/home')
          else push('/')
        }}
      />
      <ul className="flex flex-col w-full h-full">
        <li
          onClick={() => push('/home')}
          className="flex items-center px-8 py-4 font-semibold text-gray-600 transition cursor-pointer hover:shadow-md hover:text-gray-800 group"
        >
          <Home className="w-5 h-5 mr-2 text-lg text-gray-600 fas fa-home group-hover:text-indigo-500" />
          Home
        </li>
        <li className="flex items-center px-8 py-4 font-semibold text-gray-600 transition cursor-pointer hover:shadow-md hover:text-gray-800 group">
          <Message className="w-4 h-4 mt-px mr-2 text-lg text-gray-600 fas fa-home group-hover:text-purple-500" />
          Messages
        </li>
        <li className="flex items-center px-8 py-4 font-semibold text-gray-600 transition cursor-pointer hover:shadow-md hover:text-gray-800 group">
          <Profile className="w-4 h-4 mr-2 text-lg text-gray-600 fas fa-home group-hover:text-purple-500" />
          Profile
        </li>
        <li className="flex items-center px-8 py-4 font-semibold text-gray-600 transition cursor-pointer hover:shadow-md hover:text-gray-800 group">
          <Saved className="w-4 h-4 mr-2 text-lg text-gray-600 fas fa-home group-hover:text-purple-500" />
          Saved
        </li>
        <li
          onClick={async () => {
            const data = await signOut({ redirect: false, callbackUrl: '/' })
            push(data.url)
          }}
          className="flex items-center px-8 py-4 font-semibold text-gray-600 transition cursor-pointer hover:shadow-md hover:text-gray-800 group"
        >
          <Logout className="w-4 h-4 mt-1 mr-2 text-lg text-gray-600 fas fa-home group-hover:text-purple-500" />
          Logout
        </li>

        <li className="flex items-center px-8 py-4 mt-auto font-semibold text-gray-600 transition cursor-pointer hover:shadow-md hover:text-gray-800 group">
          <Settings className="w-4 h-4 mr-2 text-lg text-gray-600 fas fa-home group-hover:text-purple-500" />
          Settings
        </li>
      </ul>
    </nav>
  )
}

export default LeftNav

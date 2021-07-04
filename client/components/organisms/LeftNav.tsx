import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Home from '../../assets/svgs/home.svg'
import Logout from '../../assets/svgs/logout.svg'
import Message from '../../assets/svgs/message.svg'
import Profile from '../../assets/svgs/profile.svg'
import Saved from '../../assets/svgs/saved.svg'
import Settings from '../../assets/svgs/settings.svg'
import LeftNavBrand from '../atoms/LeftNavBrand/left-nav-brand'
import LeftNavLink from '../atoms/LeftNavLink/left-nav-link'
import LeftNavUser from '../molecules/LeftNavUser'

const LeftNav = () => {
  const { push, pathname } = useRouter()
  console.log(pathname)
  const [session] = useSession()

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    push(data.url)
  }

  if (!session) return null

  return (
    <nav className="flex flex-col h-screen max-h-screen bg-white w-72">
      <LeftNavBrand
        onClick={() => {
          if (session) push('/home')
          else push('/')
        }}
      />
      <ul className="flex flex-col w-full h-full">
        <LeftNavLink active={pathname === '/home'} icon={Home} onClick={() => push('/home')}>
          Home
        </LeftNavLink>
        <LeftNavLink
          active={pathname === '/messages'}
          icon={Message}
          onClick={() => push('/messages')}
        >
          Messages
        </LeftNavLink>
        <LeftNavLink
          active={pathname === '/profile'}
          icon={Profile}
          onClick={() => push('/profile')}
        >
          Profile
        </LeftNavLink>
        <LeftNavLink active={pathname === '/saved'} icon={Saved} onClick={() => push('/saved')}>
          Saved
        </LeftNavLink>
        <LeftNavLink active={pathname === '/logout'} icon={Logout} onClick={() => handleLogout()}>
          Logout
        </LeftNavLink>
        <LeftNavLink
          active={pathname === '/settings'}
          icon={Settings}
          onClick={() => push('/settings')}
        >
          Settings
        </LeftNavLink>

        <li className="flex items-center px-8 py-4 mt-auto mb-3 rounded-lg cursor-pointer select-none hover:bg-indigo-50">
          <LeftNavUser src={session.avatar} />
        </li>
      </ul>
    </nav>
  )
}

export default LeftNav

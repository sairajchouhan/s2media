import { signOut, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import Home from '../../assets/svgs/home.svg'
import Logout from '../../assets/svgs/logout.svg'
import Message from '../../assets/svgs/message.svg'
import Profile from '../../assets/svgs/profile.svg'
import Saved from '../../assets/svgs/saved.svg'
import Settings from '../../assets/svgs/settings.svg'
import { LeftNavPostBtn } from '../atoms/LeftNavPostBtn/LeftNavPostBtn'
import { LeftNavBrand } from '../molecules/LeftNavBrand/'
import { LeftNavLink } from '../molecules/LeftNavLink/'
import { LeftNavUser } from '../molecules/LeftNavUser/'

const LeftNav = () => {
  const { push, pathname } = useRouter()
  const [session] = useSession()

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    push(data.url)
  }

  if (!session) return null

  return (
    <nav className="flex flex-col w-64 h-screen max-h-screen">
      <LeftNavBrand
        onClick={() => {
          if (session) push('/home')
          else push('/')
        }}
      />
      <ul className="flex flex-col items-start w-full h-full space-y-2">
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
        <LeftNavPostBtn />
      </ul>
      <LeftNavUser src={session.avatar} />
    </nav>
  )
}

export default LeftNav

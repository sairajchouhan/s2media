import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import Home from '../../assets/svgs/home.svg'
import Logout from '../../assets/svgs/logout.svg'
import Message from '../../assets/svgs/message.svg'
import Profile from '../../assets/svgs/profile.svg'
import Saved from '../../assets/svgs/saved.svg'
import Settings from '../../assets/svgs/settings.svg'
import { useUser } from '../../hooks/useUser'
import { paths } from '../../utils/paths'
import { LeftNavPostBtn } from '../atoms/LeftNavPostBtn/LeftNavPostBtn'
import { LeftNavBrand, LeftNavLink, LeftNavUser } from '../molecules/LeftNav'

const LeftNav = () => {
  const { push, pathname } = useRouter()
  const user = useUser()

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    push(data.url)
  }

  if (!user) return null

  return (
    <nav className="flex flex-col w-64 h-screen max-h-screen">
      <LeftNavBrand
        onClick={() => {
          if (user) push(paths.home)
          else push(paths.landing)
        }}
      />
      <ul className="flex flex-col items-start w-full h-full space-y-2">
        <LeftNavLink active={pathname === paths.home} icon={Home} onClick={() => push(paths.home)}>
          Home
        </LeftNavLink>
        <LeftNavLink
          active={pathname === paths.messages}
          icon={Message}
          onClick={() => push(paths.messages)}
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
        <LeftNavLink
          active={pathname === paths.saved}
          icon={Saved}
          onClick={() => push(paths.saved)}
        >
          Saved
        </LeftNavLink>
        <LeftNavLink active={pathname === '/logout'} icon={Logout} onClick={() => handleLogout()}>
          Logout
        </LeftNavLink>
        <LeftNavLink
          active={pathname === paths.settings}
          icon={Settings}
          onClick={() => push(paths.settings)}
        >
          Settings
        </LeftNavLink>
        <LeftNavPostBtn />
      </ul>
      <LeftNavUser user={user} />
    </nav>
  )
}

export default LeftNav

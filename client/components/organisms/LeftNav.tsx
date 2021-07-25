import { signOut } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useUser } from '../../hooks/useUser'
import { paths } from '../../utils/paths'
import { LeftNavPostBtn } from '../atoms/LeftNavPostBtn/LeftNavPostBtn'
import {
  HomeIcon,
  MessageIcon,
  NotificationIcon,
  ProfileIcon,
  SavedIcon,
  SettingsIcon,
} from '../icons'
import { LeftNavBrand, LeftNavLink, LeftNavUser } from '../molecules/LeftNav'

const LeftNav = () => {
  const { push, pathname } = useRouter()
  const user = useUser()

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: '/' })
    push(data.url)
  }

  const isActive = (path: string) => {
    return pathname === path
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
        <LeftNavLink active={isActive(paths.home)} icon={HomeIcon} onClick={() => push(paths.home)}>
          Home
        </LeftNavLink>
        <LeftNavLink
          active={pathname === paths.messages}
          icon={MessageIcon}
          onClick={() => push(paths.messages)}
        >
          Messages
        </LeftNavLink>
        <LeftNavLink
          active={pathname.split('/').includes('profile')}
          icon={ProfileIcon}
          onClick={() => push(paths.profile({ username: user.username }).href)}
        >
          Profile
        </LeftNavLink>
        <LeftNavLink
          active={pathname === '/notifications'}
          icon={NotificationIcon}
          onClick={() => push(paths.notifications)}
        >
          Notifications
        </LeftNavLink>
        <LeftNavLink
          active={pathname === paths.saved}
          icon={SavedIcon}
          onClick={() => push(paths.saved)}
        >
          Saved
        </LeftNavLink>

        <LeftNavLink
          active={pathname === paths.settings}
          icon={SettingsIcon}
          onClick={() => push(paths.settings)}
        >
          Settings
        </LeftNavLink>
        <LeftNavLink
          active={pathname === '/logout'}
          icon={() => <></>}
          onClick={() => handleLogout()}
        >
          Logout
        </LeftNavLink>
        <LeftNavPostBtn />
      </ul>
      <LeftNavUser user={user} />
    </nav>
  )
}

export default LeftNav

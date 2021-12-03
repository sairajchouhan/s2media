import { useRouter } from 'next/router'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { useSocket } from '../../context/socketContext'
import { paths } from '../../utils/paths'
import { LeftNavPostBtn } from '../atoms/LeftNavPostBtn/LeftNavPostBtn'
import {
  HomeIcon,
  LogoutIcon,
  MessageIcon,
  NotificationIcon,
  ProfileIcon,
  SettingsIcon,
} from '../icons'
import { LeftNavBrand, LeftNavLink, LeftNavUser } from '../molecules/LeftNav'

const LeftNav = () => {
  const router = useRouter()
  const { push, pathname } = useRouter()
  const { rqUser, logout, getIdToken } = useAuth()
  const sockData = useSocket()

  console.log(sockData)

  const handleLogout = async () => {
    const token = await getIdToken()
    await logout()
    // nookies.destroy(undefined, 'idk')
    router.push('/login')
    await axios.delete('/user/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  if (!rqUser) return null

  return (
    <nav className="flex flex-col w-64 h-screen max-h-screen">
      <LeftNavBrand
        onClick={() => {
          if (rqUser) push(paths.home)
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
          onClick={() => push(paths.profile({ username: rqUser.username }).href)}
        >
          Profile
        </LeftNavLink>
        <LeftNavLink
          active={pathname === '/notifications'}
          icon={NotificationIcon}
          onClick={() => push(paths.notifications)}
          isCountable={true}
          countValue={sockData?.notifications?.length}
        >
          Notifications
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
          icon={LogoutIcon}
          onClick={() => handleLogout()}
        >
          Logout
        </LeftNavLink>
        <LeftNavPostBtn />
      </ul>
      <LeftNavUser user={rqUser} />
    </nav>
  )
}

export default LeftNav

import { useRouter } from 'next/router'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { useSocket } from '../../context/socketContext'
import { useTwWindowSize } from '../../hooks/useTwWindowSize'
import { paths } from '../../utils/paths'
import { LeftNavPostBtn } from '../atoms/LeftNavPostBtn/LeftNavPostBtn'
import {
  HomeIcon,
  LogoutIcon,
  NotificationIcon,
  ProfileIcon,
  SettingsIcon,
  SavedIcon,
  SearchIcon,
} from '../icons'
import { LeftNavBrand, LeftNavLink, LeftNavUser } from '../molecules/LeftNav'

const LeftNav = () => {
  const router = useRouter()
  const { push, pathname } = useRouter()
  const { rqUser, logout, getIdToken } = useAuth()
  const notificationsData = useSocket()
  const { screenSize } = useTwWindowSize()

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

        {screenSize === 'xl' || screenSize === '2xl' ? null : (
          <LeftNavLink
            active={pathname === '/search'}
            icon={SearchIcon}
            onClick={() => push(paths.search)}
          >
            Search
          </LeftNavLink>
        )}

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
          countValue={notificationsData?.newNotificationNumber}
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

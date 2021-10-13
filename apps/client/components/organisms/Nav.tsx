import { useRouter } from 'next/router'
import { paths } from '../../utils/paths'
import { Button } from '../atoms/Button/Button'
import { LeftNavBrand } from '../molecules/LeftNav/left-nav-brand'

interface NavProps {}
const Nav = (_props: NavProps) => {
  const router = useRouter()
  return (
    <div className="w-full h-14">
      <div className="flex items-center justify-between h-full px-20">
        <div className="text-2xl font-bold">
          <LeftNavBrand onClick={() => router.push(paths.landing)} />
        </div>
        <ul className="flex items-center h-full">
          <>
            <li>
              <Button onClick={() => router.push(paths.signup)} variant="outline">
                Signup
              </Button>
            </li>
            <span className="px-3"></span>
            <li>
              <Button onClick={() => router.push(paths.login)}>Login</Button>
            </li>
          </>
        </ul>
      </div>
    </div>
  )
}
export default Nav

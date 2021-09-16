import { paths } from '../../../utils/paths'
import { Link } from '../../Link'

const ProfileNav = ({
  active,
  username,
}: {
  active: 'all' | 'liked' | 'saved'
  username: string
}) => {
  return (
    <section className="mt-4">
      <nav className="border-t border-b border-opacity-80">
        <ul className="flex items-center justify-around h-10">
          <li
            className={`flex items-center justify-center flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-blue-50 border-opacity-80 ${
              active === 'all' ? 'border-b-2 border-indigo-400' : ''
            }`}
          >
            <Link
              className="flex items-center justify-center w-full h-full"
              to={paths.profile({ username })}
            >
              Your Posts
            </Link>
          </li>
          <li
            className={`flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-indigo-50 border-opacity-80 ${
              active === 'liked' ? 'border-b-2 border-indigo-400' : ''
            }`}
          >
            <Link
              className="flex items-center justify-center w-full h-full"
              to={paths.profile({ username, query: { like: true } })}
            >
              Liked
            </Link>
          </li>
          <li
            className={`flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-indigo-50 border-opacity-80 ${
              active === 'saved' ? 'border-b-2 border-indigo-400' : ''
            }`}
          >
            <Link
              className="flex items-center justify-center w-full h-full"
              to={paths.profile({ username, query: { save: true } })}
            >
              Saved
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default ProfileNav

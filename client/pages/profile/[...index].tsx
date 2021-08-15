import React from 'react'
import { Link } from '../../components/Link'
import { PageNav } from '../../components/molecules/Page/page-nav'
import { ProfileCard } from '../../components/molecules/Profile'
import { useAuth } from '../../context/authContext'
import { paths } from '../../utils/paths'

const Profile = () => {
  const { user: userFullDetails } = useAuth()
  if (!userFullDetails) return

  return (
    <div className="min-h-screen border-l border-r border-opacity-80">
      <PageNav title="Profile" subtitle={`@${userFullDetails.username}`} />
      <main className="flex flex-col mt-4">
        <ProfileCard userFullDetails={userFullDetails} />

        <section className="mt-4">
          <nav className="border-t border-b border-opacity-80">
            <ul className="flex items-center justify-around h-10">
              <li className="flex items-center justify-center flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-indigo-50 border-opacity-80">
                <Link
                  className="flex items-center justify-center w-full h-full"
                  to={paths.profile({ username: userFullDetails.username })}
                >
                  Your Posts
                </Link>
              </li>
              <li className="flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-indigo-50 border-opacity-80">
                <Link
                  className="flex items-center justify-center w-full h-full"
                  to={paths.profile({ username: 'someuser' })}
                >
                  Liked
                </Link>
              </li>
              <li className="flex-1 h-full text-sm font-semibold text-center cursor-pointer hover:bg-indigo-50 border-opacity-80">
                <Link
                  className="flex items-center justify-center w-full h-full"
                  to={paths.profile({ username: 'someuser' })}
                >
                  Saved
                </Link>
              </li>
            </ul>
          </nav>
        </section>
        <section>{/* TODO: render posts here */}</section>
      </main>
    </div>
  )
}

export default Profile

import { useTwWindowSize } from '../../../hooks/useTwWindowSize'
import { AuthUser } from '../../../types/user'
import { Avatar } from '../../atoms/Avatar'
import { DotsHorizontal } from '../../icons'

export interface LeftNavUserProps {
  user: AuthUser
}

export const LeftNavUser = ({ user: { username, profile, avatar } }: LeftNavUserProps) => {
  const { screenSize } = useTwWindowSize()

  return (
    <li className="flex items-center mt-auto mb-3 rounded-lg cursor-pointer select-none lg:px-4 lg:py-4 hover:bg-indigo-50">
      <div className="flex items-center justify-center w-full lg:justify-start ">
        <div className="grid place-items-center">
          <Avatar src={avatar} alt="ransom image from unsplash" w="w-10" h="h-10" />
        </div>
        {screenSize !== '_' && screenSize !== 'sm' && screenSize !== 'md' ? (
          <div className="flex items-center justify-between flex-1 pl-3">
            <div>
              <p className="text-base font-bold leading-5">{profile.displayName}</p>
              <p className="text-base font-semibold text-gray-600">@{username}</p>
            </div>
            <div className="w-4 h-4 text-gray-600">
              <DotsHorizontal />
            </div>
          </div>
        ) : null}
      </div>
    </li>
  )
}

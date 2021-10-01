import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { LeftNavIconComp } from '../../../types'
import { PostWithBaseUser } from '../../../types/post'
import { paths } from '../../../utils/paths'
import { Avatar } from '../../atoms/Avatar/avatar'
import { IconButton } from '../../atoms/IconButton'
import { DeleteIcon } from '../../icons/DeleteIcon'
import { EditIcon } from '../../icons/EditIcon'
import { Menu } from '../Menu'

export interface PostHeadProps {
  icon: LeftNavIconComp
  post: PostWithBaseUser
}

export const PostHead = ({ post: { user, caption, createdAt }, icon }: PostHeadProps) => {
  return (
    <div>
      <div className="flex items-center justify-between px-2 py-2">
        <div className="flex items-center">
          <Link href={paths.profile({ username: user.username }).href}>
            <a className="flex items-center">
              <Avatar src={user.avatar} w="w-10" h="h-10" alt="user profile image" />
            </a>
          </Link>
          <div className="flex flex-col pl-2">
            <Link href={paths.profile({ username: user.username }).href}>
              <a>
                <div className="flex items-center">
                  <div className="font-semibold leading-4 text-gray-800 cursor-pointer text-md hover:underline">
                    {user?.profile.displayName}
                  </div>
                  <div className="mx-1 text-base font-normal text-gray-600">·</div>
                  <p className="text-sm leading-5 text-gray-500 text-md">@{user?.username}</p>
                </div>
              </a>
            </Link>
            <p className="text-xs leading-4 text-gray-500">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="">
          <Menu
            activationButton={() => (
              <IconButton w="w-4" h="h-4" hoverBgColor="bg-gray-100" icon={icon} />
            )}
          >
            <Menu.Item icon={EditIcon}>Edit</Menu.Item>
            <Menu.Item className="text-red-500" activeClassName="hover:bg-red-50" icon={DeleteIcon}>
              Delete
            </Menu.Item>
          </Menu>
        </div>
      </div>
      {caption && (
        <div className="flex px-2 pb-2">
          <p className="items-end flex-1 text-base leading-6 text-gray-700">{caption}</p>
        </div>
      )}
    </div>
  )
}

import { Menu, Transition } from '@headlessui/react'
import React from 'react'
import { useAuth } from '../../../context/authContext'
import { paths } from '../../../utils/paths'
import { IconButton } from '../../atoms/IconButton/icon-button'
import { DotsHorizontal } from '../../icons'
import { Link } from '../../Link'

export const CommentReplyText = ({ crEntity, isReply }: { crEntity: any; isReply?: boolean }) => {
  const { user } = useAuth()
  return (
    <div className="px-2 bg-gray-100 rounded-md">
      <div className="flex items-start justify-between">
        <div className="">
          <div className="flex items-center">
            <Link to={paths.profile({ username: crEntity.user.username })}>
              <p className="text-sm font-semibold leading-4 text-gray-800 cursor-pointer hover:underline">
                {crEntity.user.profile.displayName}
              </p>
            </Link>
            <div className="mx-1 text-base font-normal text-gray-600">·</div>
            <Link to={paths.profile({ username: crEntity.user.username })}>
              <p className="text-xs text-gray-500 cursor-pointer">@{crEntity.user.username}</p>
            </Link>
          </div>
          <p className="text-xs leading-4 text-gray-500">{JSON.stringify(crEntity.createdAt)}</p>
        </div>
        <div className="flex">
          <Menu as="div" className="relative inline-block">
            <div>
              <Menu.Button as="div">
                <IconButton w="w-4" h="h-4" hoverBgColor="bg-gray-100" icon={DotsHorizontal} />
              </Menu.Button>
            </div>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="">
                  {crEntity.userId === user?.uid ? (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-gray-100' : 'bg-white'
                            } group flex rounded-tl-md rounded-tr-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Edit
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-red-100' : 'bg-white'
                            } group text-red-500 flex rounded-bl-md rounded-br-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </>
                  ) : (
                    <>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-gray-100' : 'bg-white'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Report
                          </button>
                        )}
                      </Menu.Item>
                    </>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="pb-2 mt-1">
        <p className="text-sm">{isReply ? crEntity.replyText : crEntity.commentText}</p>
      </div>
    </div>
  )
}

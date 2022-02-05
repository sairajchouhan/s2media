import React from 'react'
import { Model } from '../molecules/Model'
import { useRouter } from 'next/router'
import { Avatar } from '../atoms/Avatar'

interface IUserListModel {
  open: boolean
  toggleOpen: () => void
  title: string
  data: Array<any>
}

const UserListModel = ({ open, toggleOpen, title, data }: IUserListModel) => {
  const router = useRouter()

  return (
    <>
      {open ? (
        <Model open={open} toggleOpen={toggleOpen}>
          <Model.Head toggleOpen={toggleOpen} title={title} />
          <Model.Body>
            {data && data.length > 0 ? (
              data.map((item) => (
                <div
                  key={item.id}
                  className="px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    toggleOpen()
                    router.push(`/profile/${item.user.username}`)
                  }}
                >
                  <div className="flex items-center">
                    <Avatar
                      src={item.user.avatar}
                      w="w-10"
                      h="h-10"
                      alt={`${item.user.username}'s profile image'`}
                    />
                    <p className="ml-4">{item.user.username}</p>
                  </div>
                </div>
              ))
            ) : (
              <></>
            )}
          </Model.Body>
        </Model>
      ) : null}
    </>
  )
}

export default UserListModel

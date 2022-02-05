import React, { useState } from 'react'
import { Model } from '../molecules/Model'
import { CircleLoader } from '../atoms/CircleLoader'

const UserListModel = () => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen((open) => !open)
  }

  return (
    <>
      {/* {open ? (
        <Model open={open} toggleOpen={toggleOpen}>
          <Model.Head toggleOpen={toggleOpen} title={type} />
          <Model.Body>
            {isError ? (
              <div>Something went wrong</div>
            ) : isLoading ? (
              <CircleLoader className="py-10" />
            ) : data && data[type]?.length > 0 ? (
              data[type].map((followerOrIng: any) => (
                <div
                  key={followerOrIng.id}
                  className="px-3 py-2 rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    toggleOpen()
                    router.push(`/profile/${followerOrIng.username}`)
                  }}
                >
                  <div className="flex items-center">
                    <Avatar
                      src={followerOrIng.avatar}
                      w="w-10"
                      h="h-10"
                      alt={`${profileUserUsername}'s profile image'`}
                    />
                    <p className="ml-4">{followerOrIng.username}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>No {type}</div>
            )}
          </Model.Body>
        </Model>
      ) : null} */}
    </>
  )
}

export default UserListModel

/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction } from 'react'
import { useFile } from '../../hooks/useFIleUpload'
import { UserFullDetails } from '../../types/user'
import { Avatar } from '../atoms/Avatar'
import { Model } from '../molecules/Model'

export interface EditProfileProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  userFullDetails: UserFullDetails
}
export const EditProfile = ({ open, setOpen, userFullDetails: user }: EditProfileProps) => {
  const { handleFileChange, previewUrl, resetFile, selectedFile } = useFile()

  const toggleOpen = () => {
    setOpen((open) => !open)
    resetFile()
  }

  console.log(`user from profile ${user}`)

  return (
    <Model open={open} toggleOpen={toggleOpen}>
      <Model.Head title="Edit Profile" toggleOpen={toggleOpen} />
      <Model.Body>
        <div className="flex flex-col items-center mt-5">
          <div className="">
            {previewUrl ? (
              <div className="w-40 h-40 overflow-hidden rounded-full">
                <img
                  src={previewUrl}
                  className="object-cover object-center w-full h-full"
                  alt="preview url"
                />
              </div>
            ) : (
              <Avatar src={user.avatar} alt="user profile avatar" w="w-40" h="h-40" />
            )}
          </div>
          <div role="button" className="mt-3">
            <label
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md cursor-pointer hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              htmlFor="postfile"
            >
              Change Profile Pic
            </label>
            <input onChange={handleFileChange} id="postfile" type="file" className="hidden" />
          </div>
        </div>
      </Model.Body>
      <Model.Foot>
        <div className="flex items-center justify-end">
          <button>Update</button>
        </div>
      </Model.Foot>
    </Model>
  )
}

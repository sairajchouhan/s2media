/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useState } from 'react'
import { axios } from '../../config/axios'
import { useFileUpload } from '../../hooks/useFileUpload'
import { AuthUser } from '../../types/user'
import { Avatar } from '../atoms/Avatar'
import { Model } from '../molecules/Model'

export interface EditProfileProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  userFullDetails: AuthUser
}
export const EditProfile = ({ open, setOpen, userFullDetails: user }: EditProfileProps) => {
  const { handleFileChange, previewUrl, resetFile, selectedFile } = useFileUpload()
  const [profile, setProfile] = useState<{ name: string; bio: string }>({ name: '', bio: '' })

  const handleProfileInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProfile((profile) => ({ ...profile, [e.target.name]: e.target.value }))
  }

  const toggleOpen = () => {
    setOpen((open) => !open)
    resetFile()
  }

  const handleUpdateProfile = async () => {
    // return from the function if profile.name is trimmed and empty
    if (profile.name.trim() === '' && profile.name.trim() === '') {
      return
    }

    try {
      const res = await axios.put(
        '/user/profile',
        {
          displayName: profile.name,
          bio: profile.bio,
        },
        {
          headers: {
            Authorization: `Bearer ${user.idToken}`,
          },
        }
      )
      console.log(res.data)
      setProfile({ name: '', bio: '' })
      toggleOpen()
    } catch (err) {
      console.log('err in updating user profile')
      console.log(err.response.data)
    }
  }

  return (
    <Model open={open} toggleOpen={toggleOpen}>
      <Model.Head title="Edit Profile" toggleOpen={toggleOpen} />
      <Model.Body>
        <div className="flex flex-col items-center mt-5 ">
          <div className="">
            {previewUrl ? (
              <div className="w-40 h-40 overflow-hidden rounded-full text-">
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
              htmlFor="avatarFile"
            >
              Change Profile Pic
            </label>
            <input onChange={handleFileChange} id="avatarFile" type="file" className="hidden" />
          </div>
          <div className="w-full mt-4 space-y-5">
            <div className="">
              <label htmlFor="name">Name</label>
              <input
                onChange={handleProfileInputChange}
                value={profile.name}
                name="name"
                type="text"
                id="name"
                className="w-full border rounded-md "
              />
            </div>
            <div className="">
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                id="bio"
                onChange={handleProfileInputChange}
                value={profile.bio}
                className="block w-full rounded-md"
                style={{ resize: 'none' }}
              ></textarea>
            </div>
          </div>
        </div>
      </Model.Body>
      <Model.Foot>
        <div className="flex items-center justify-end mt-6">
          <button
            className="px-3 py-2 text-sm font-medium text-green-900 transition-all bg-green-100 rounded-lg hover:bg-green-200"
            onClick={() => handleUpdateProfile()}
          >
            Update
          </button>
        </div>
      </Model.Foot>
    </Model>
  )
}

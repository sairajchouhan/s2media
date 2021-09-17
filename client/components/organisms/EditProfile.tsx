/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useFileUpload } from '../../hooks/useFileUpload'
import { AuthUser } from '../../types/user'
import { Avatar } from '../atoms/Avatar'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import { EditIcon } from '../icons'
import { Model } from '../molecules/Model'

const maxBioLength = 120
export interface EditProfileProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  user: AuthUser
}
export const EditProfile = ({ open, setOpen, user: user }: EditProfileProps) => {
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

    // try {
    //   const res = await axios.put(
    //     '/user/profile',
    //     {
    //       displayName: profile.name,
    //       bio: profile.bio,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${user.idToken}`,
    //       },
    //     }
    //   )
    //   console.log(res.data)
    //   setProfile({ name: '', bio: '' })
    //   toggleOpen()
    // } catch (err) {
    //   console.log('err in updating user profile')
    //   console.log((err as any).response.data)
    // }
  }

  const handleProfileEditClose = () => {
    toggleOpen()
    setProfile({ name: '', bio: '' })
  }

  return (
    <Model open={open} toggleOpen={toggleOpen}>
      <Model.Head title="Edit Profile" toggleOpen={toggleOpen} />
      <Model.Body>
        <div className="flex flex-col items-center mt-5 ">
          <div className="relative">
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
            <div className="absolute bottom-2 right-2">
              <div role="button">
                <label
                  className="inline-flex items-center justify-center p-1 text-gray-600 bg-blue-100 border border-transparent rounded-full cursor-pointer hover:bg-blue-200 d-flex focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  htmlFor="avatarFile"
                >
                  <EditIcon />
                </label>
                <input onChange={handleFileChange} id="avatarFile" type="file" className="hidden" />
              </div>
            </div>
          </div>
          <div className="w-full mt-4 space-y-5">
            <div className="">
              <Input
                id="name"
                name="name"
                label="Name"
                placeholder="Your new Name :)"
                value={profile.name}
                onChange={handleProfileInputChange}
              />
            </div>
            <div className="">
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                id="bio"
                onChange={(e) => {
                  if (e.target.value.length <= maxBioLength) {
                    setProfile((profile) => ({ ...profile, bio: e.target.value }))
                  }
                }}
                value={profile.bio}
                className="w-full text-sm border-gray-400 rounded outline-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                style={{ resize: 'none' }}
                placeholder="Your new Bio :)"
              ></textarea>
              <div className="flex justify-end">
                <div className="text-xs leading-3">
                  <span className={maxBioLength - profile.bio.length <= 20 ? 'text-red-500' : ''}>
                    {profile.bio.length}
                  </span>
                  /{maxBioLength}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Model.Body>
      <Model.Foot>
        <div className="flex items-center justify-end mt-6 space-x-3">
          <Button colorScheme="red" onClick={() => handleProfileEditClose()}>
            Cancel
          </Button>
          <Button colorScheme="green">Update</Button>
        </div>
      </Model.Foot>
    </Model>
  )
}

import React, { Dispatch, SetStateAction, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { useToast } from '../../context/toastContext'
import { useFileUpload } from '../../hooks/useFileUpload'
import { AuthUser } from '../../types/user'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'
import { EditIcon } from '../icons'
import { Model } from '../molecules/Model'

const maxBioLength = 120
export interface EditProfileProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  profileUser: AuthUser
}
export const EditProfile = ({ open, setOpen, profileUser }: EditProfileProps) => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { user, getIdToken } = useAuth()
  const { handleFileChange, previewUrl, resetFile, selectedFile } = useFileUpload()
  const [profile, setProfile] = useState<{ name: string; bio: string }>({
    name: user?.profile.displayName ?? '',
    bio: user?.profile.bio ?? '',
  })

  const handleProfileInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProfile((profile) => ({ ...profile, [e.target.name]: e.target.value }))
  }

  const toggleOpen = () => {
    setOpen((open) => !open)
    resetFile()
  }

  const profileUpdateMutation = useMutation(
    async () => {
      const idToken = await getIdToken()
      const formData = new FormData()
      if (selectedFile) {
        formData.append('image', selectedFile as Blob)
      }
      formData.append('displayName', profile.name)
      formData.append('bio', profile.bio)
      return axios.put(`/user/profile`, formData, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
    },
    {
      onSuccess: (_data, _vars, _context) => {
        queryClient.invalidateQueries(['user', profileUser.username])
        toggleOpen()
        toast({ type: 'success', message: 'Profile updated successfully' })
      },
      onError: (error, _vars, _context) => {
        console.log(error)
        toast({ type: 'error', message: 'Something went wrong :( Try again' })
      },
    }
  )

  const handleUpdateProfile = async () => {
    if (profile.name.trim() === '' && profile.name.trim() === '') {
      setProfile({
        name: profileUser.profile.displayName as string,
        bio: profileUser.profile.bio as string,
      })
      return toggleOpen()
    }
    if (profile.name === profileUser.profile.displayName && profile.bio === profileUser.profile.bio && !selectedFile) {
      return toggleOpen()
    }
    profileUpdateMutation.mutate()
  }

  const handleProfileEditClose = () => {
    toggleOpen()
  }

  return (
    <Model open={open} toggleOpen={toggleOpen}>
      <Model.Head title="Edit Profile" toggleOpen={toggleOpen} />
      <Model.Body>
        <div className="flex flex-col items-center mt-5 ">
          <div className="relative ">
            <div className="w-40 h-40 overflow-hidden rounded-full ">
              {previewUrl ? (
                <img src={previewUrl} className="object-cover object-center w-full h-full" alt="preview url" />
              ) : (
                <img src={profileUser.avatar as any} className="block w-full h-full" alt="user profile avatar" />
              )}
            </div>
            <div className="absolute bottom-2 right-2">
              <div role="button">
                <label
                  className="inline-flex items-center justify-center p-1 text-gray-600 bg-blue-100 border border-transparent rounded-full cursor-pointer hover:bg-blue-200 d-flex focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  htmlFor="avatarFile"
                >
                  <EditIcon className="w-5 h-5" />
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
                    setProfile((profile) => ({
                      ...profile,
                      bio: e.target.value,
                    }))
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
          <Button
            disabled={profileUpdateMutation.isLoading}
            colorScheme="red"
            variant="outline"
            onClick={() => handleProfileEditClose()}
          >
            Cancel
          </Button>
          <Button loading={profileUpdateMutation.isLoading} colorScheme="indigo" onClick={handleUpdateProfile}>
            Update
          </Button>
        </div>
      </Model.Foot>
    </Model>
  )
}

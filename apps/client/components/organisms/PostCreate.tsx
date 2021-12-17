/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { CREATE_POST, GET_POSTS_FOR_HOME } from '../../utils/querykeysAndPaths'
import { AutoGrowTextArea } from '../atoms/AutoGrowTextArea'
import { Avatar } from '../atoms/Avatar'
import { Button } from '../atoms/Button'
import { IconButton } from '../atoms/IconButton'
import { CancenIcon } from '../icons/CancenIcon'
import { Model } from '../molecules/Model'
import { ModelBody } from '../molecules/Model/model-body'
import { PhotographIcon } from '@heroicons/react/outline'
import { useQueryClient } from 'react-query'

export interface PostCreateInterface {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const PostCreate = ({ open, setOpen }: PostCreateInterface) => {
  const queryClient = useQueryClient()
  const { rqUser, getIdToken } = useAuth()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }, [selectedFile])

  if (!rqUser) return null

  const toggleOpen = () => {
    setOpen((open) => !open)
    handlePostCancel()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files) {
      setSelectedFile(files[0])
    }
  }

  const handleRemoveSelectedImage = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handlePostCancel = () => {
    setTimeout(() => {
      setSelectedFile(null)
      setPreviewUrl(null)
    }, 200)
  }

  const handleCreatePost = async () => {
    const formData = new FormData()
    const token = await getIdToken()
    formData.append('image', selectedFile as Blob)
    if (textareaRef.current?.value !== '' && textareaRef.current?.value) {
      formData.append('caption', textareaRef.current?.value as string)
    }
    try {
      console.log(formData)
      setLoading((l) => !l)
      await axios.post(CREATE_POST.path, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setOpen((open) => !open)
      setSelectedFile(null)
      setPreviewUrl(null)
      await queryClient.invalidateQueries(GET_POSTS_FOR_HOME.queryKey())
    } catch (err) {
      console.log(err)
    }
    setLoading((l) => !l)
  }

  return (
    <>
      <Model open={open} toggleOpen={toggleOpen} initialFoucsRef={textareaRef}>
        <Model.Head title="Create Post" toggleOpen={toggleOpen} />
        <ModelBody>
          <div className="mt-4">
            <div className="flex items-start h-full space-x-4">
              <div className="h-full">
                {rqUser.avatar ? (
                  <Avatar
                    src={rqUser.avatar ?? undefined}
                    w="w-10"
                    h="h-10"
                    alt="authenticated rqUser avatar"
                  />
                ) : null}
              </div>
              <div className="flex items-center flex-1 h-full">
                <AutoGrowTextArea initialFocusRef={textareaRef} />
              </div>
            </div>
            <div className="mt-3">
              {previewUrl ? (
                <div className="relative flex justify-center w-full h-auto">
                  <div className="overflow-hidden rounded-lg">
                    <img src={previewUrl} className="block" alt="preview url" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <IconButton
                      icon={CancenIcon}
                      w="w-4"
                      h="h-4"
                      p="p-1"
                      hoverBgColor="bg-black bg-opacity-60"
                      textColour="text-gray-300"
                      bgColor="bg-black bg-opacity-50"
                      onClick={handleRemoveSelectedImage}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </ModelBody>

        <Model.Foot>
          <div className="flex items-center justify-between mt-6">
            <div>
              <label
                role="button"
                className="p-1.5 transform translate-y-1.5 rounded-full flex items-center justify-center hover:bg-blue-50"
                htmlFor="postfile"
              >
                <PhotographIcon className="w-5 h-5 text-indigo-500" />
              </label>
              <input onChange={handleFileChange} id="postfile" type="file" className="hidden" />
            </div>
            <Button
              onClick={handleCreatePost}
              variant="solid"
              colorScheme="indigo"
              loading={loading}
              disabled={loading}
            >
              Post
            </Button>
          </div>
        </Model.Foot>
      </Model>
    </>
  )
}

export default PostCreate

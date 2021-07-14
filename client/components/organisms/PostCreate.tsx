/* eslint-disable @next/next/no-img-element */
import axios from 'axios'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import CancelWhite from '../../assets/svgs/cancelwhite.svg'
import { useUser } from '../../hooks/useUser'
import { AutoGrowTextArea } from '../atoms/AutoGrowTextArea'
import { Avatar } from '../atoms/Avatar'
import { IconButton } from '../atoms/IconButton'
import { Model } from '../molecules/Model'
import { ModelBody } from '../molecules/Model/model-body'
export interface PostCreateInterface {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const PostCreate = ({ open, setOpen }: PostCreateInterface) => {
  const user = useUser()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [selectedFile, setSelectedFile] = useState<Blob | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  // const [caption, setCaption] = useState('')

  useEffect(() => {
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }, [selectedFile])

  // const validateInputFile = () => {}
  if (!user) return null

  const toggleOpen = () => {
    setOpen((open) => !open)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (files) {
      setSelectedFile(files[0])
    }
  }

  const handleRemoveSelectedImage = () => {
    console.log('I will remove')
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  const handlePostCancel = () => {
    setOpen((open) => !open)
    setTimeout(() => {
      setSelectedFile(null)
      setPreviewUrl(null)
    }, 200)
  }

  const validatePostData = () => {
    let res: boolean
    if (!selectedFile) res = false
    else res = true
    return res
  }

  const handleCreatePost = async () => {
    const isValid = validatePostData()

    if (!isValid) {
      console.log('data is not validated')
      return
    }

    const formData = new FormData()
    formData.append('image', selectedFile as Blob)
    if (textareaRef.current?.value !== '' && textareaRef.current?.value) {
      formData.append('caption', textareaRef.current?.value as string)
    }
    try {
      console.log(formData)
      const res = await axios.post('http://localhost:5000/api/v1/post', formData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      setOpen((open) => !open)
      setSelectedFile(null)
      setPreviewUrl(null)
      console.log(res)
    } catch (err) {
      console.log('err ra babu')
      console.log(err)
    }
  }

  return (
    <>
      <Model open={open} toggleOpen={toggleOpen} initialFoucsRef={textareaRef}>
        <Model.Head title="Create Post" toggleOpen={toggleOpen} />
        <ModelBody>
          <div className="mt-4">
            <div className="flex items-start h-full space-x-4">
              <div className="h-full">
                <Avatar src={user.avatar} w="w-10" h="h-10" alt="authenticated user avatar" />
              </div>
              <div className="flex items-center flex-1 h-full">
                <AutoGrowTextArea initialFocusRef={textareaRef} />
              </div>
            </div>
            <div className="mt-3">
              {previewUrl && (
                <div className="relative flex justify-center w-full h-auto">
                  <div className="overflow-hidden rounded-lg">
                    <img src={previewUrl} className="block" alt="preview url" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <IconButton
                      icon={CancelWhite}
                      w="w-4"
                      h="h-4"
                      p="p-1"
                      hoverBgColor="bg-black bg-opacity-60"
                      textColour="text-white"
                      bgColor="bg-black bg-opacity-50"
                      onClick={handleRemoveSelectedImage}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </ModelBody>
        <Model.Foot>
          <div className="flex items-center justify-between mt-6">
            <div>
              <label
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md cursor-pointer hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                htmlFor="postfile"
              >
                Upload image
              </label>
              <input onChange={handleFileChange} id="postfile" type="file" className="hidden" />
            </div>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={handleCreatePost}
            >
              Post
            </button>
          </div>
        </Model.Foot>
      </Model>
    </>
  )
}

export default PostCreate

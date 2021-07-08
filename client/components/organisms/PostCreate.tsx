import { Dialog, Transition } from '@headlessui/react'
import React, { Dispatch, Fragment, MutableRefObject, SetStateAction } from 'react'
import Cross from '../../assets/svgs/cross.svg'
import { useUser } from '../../hooks/useUser'
import { AutoGrowTextArea } from '../atoms/AutoGrowTextArea'
import { Avatar } from '../atoms/Avatar'
import { IconButton } from '../atoms/IconButton'

export interface PostCreateInterface {
  initialFocusRef: MutableRefObject<null>
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const PostCreate = ({ initialFocusRef, open, setOpen }: PostCreateInterface) => {
  const user = useUser()
  if (!user) return null

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          initialFocus={initialFocusRef}
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={setOpen}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            {/* <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span> */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl px-6 py-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="flex items-center justify-between">
                  <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-700">
                    Create post
                  </Dialog.Title>
                  <IconButton icon={Cross} textColour="text-indigo-500" hoverBgColor="bg-blue-50" />
                </div>
                <span className="block w-full h-px my-2 bg-gray-200"></span>
                <div className="mt-4">
                  <div className="flex items-start h-full space-x-4">
                    <div className="h-full">
                      <Avatar src={user.avatar} w="w-10" h="h-10" alt="authenticated user avatar" />
                    </div>
                    <div className="flex items-center flex-1 h-full">
                      <AutoGrowTextArea initialFocusRef={initialFocusRef} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-1 font-medium text-indigo-600 transition-all border border-transparent rounded-md text-md bg-blue-50 hover:bg-blue-100"
                    onClick={() => setOpen((open) => !open)}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default PostCreate

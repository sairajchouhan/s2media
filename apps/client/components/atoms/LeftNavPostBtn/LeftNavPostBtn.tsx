import { useState } from 'react'
import PostCreate from '../../organisms/PostCreate'
import { useTwWindowSize } from '../../../hooks/useTwWindowSize'
import { PlusIcon } from '@heroicons/react/outline'

export const LeftNavPostBtn = () => {
  const [openPostCreateModel, setOpenPostCreateModel] = useState(false)
  const { screenSize } = useTwWindowSize()

  return (
    <>
      {screenSize === '_' || screenSize === 'sm' || screenSize === 'md' ? (
        <div className="flex justify-center w-full pt-3">
          <button
            onClick={() => {
              setOpenPostCreateModel((open) => !open)
            }}
            className="p-1 -translate-x-0.5 bg-indigo-500 rounded-full hover:bg-indigo-600"
          >
            <PlusIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      ) : (
        <li
          className="flex items-center w-11/12 pt-4 select-none ursor-pointer"
          onClick={() => {
            setOpenPostCreateModel((open) => !open)
          }}
        >
          <button className="block w-full py-3 text-lg font-semibold tracking-widest text-white uppercase transition bg-indigo-500 rounded-full hover:bg-indigo-600">
            Post
          </button>
        </li>
      )}
      <PostCreate open={openPostCreateModel} setOpen={setOpenPostCreateModel} />
    </>
  )
}

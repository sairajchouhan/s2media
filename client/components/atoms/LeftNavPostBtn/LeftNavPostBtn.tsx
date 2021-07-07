import { useRef, useState } from 'react'
import PostCreate from '../../organisms/PostCreate'

export const LeftNavPostBtn = () => {
  const initialFocusRef = useRef(null)
  const [openPostCreateModel, setOpenPostCreateModel] = useState(false)
  return (
    <>
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
      <PostCreate
        open={openPostCreateModel}
        setOpen={setOpenPostCreateModel}
        initialFocusRef={initialFocusRef}
      />
    </>
  )
}

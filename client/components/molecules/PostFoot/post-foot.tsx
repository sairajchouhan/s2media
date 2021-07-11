import React from 'react'
import { IconButton } from '../../atoms/IconButton'

export interface PostFootInterface {
  icon1: typeof React.Component
  icon2: typeof React.Component
  icon3: typeof React.Component
}

export const PostFoot = ({ icon1, icon2, icon3 }: PostFootInterface) => {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <div className="flex">
        <IconButton
          w="w-6"
          h="h-6"
          textColour="text-red-600"
          hoverBgColor="bg-red-100"
          icon={icon1}
        />
        <IconButton w="w-6" h="h-6" icon={icon2} />
      </div>
      <div>
        <IconButton icon={icon3} w="w-6" h="h-6" />
      </div>
    </div>
  )
}

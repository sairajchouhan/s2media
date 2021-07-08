import React from 'react'

export interface IconButtonProps {
  icon: typeof React.Component
  w?: string
  h?: string
  textColour?: string
  hoverBgColor?: string
}

export const IconButton = ({
  icon: Icon,
  textColour = 'text-gray-600',
  hoverBgColor = 'bg-gray-200',
  w = 'w-5',
  h = 'h-5',
  ...props
}: IconButtonProps) => {
  return (
    <button className={`p-2 rounded-full cursor-pointer hover:${hoverBgColor}`} {...props}>
      <div className={`${w} ${h} ${textColour} flex justify-center items-center`}>
        <Icon />
      </div>
    </button>
  )
}

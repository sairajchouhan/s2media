import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { LeftNavIconProps } from '../../../types/icon'

export interface IconButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  // eslint-disable-next-line no-unused-vars
  icon: (props: LeftNavIconProps) => JSX.Element
  variant?: 'solid' | 'outline'
  w?: string
  h?: string
  textColour?: string
  bgColor?: string
  hoverBgColor?: string
  p?: string
}

export const IconButton = ({
  icon: Icon,
  textColour = 'text-gray-600',
  bgColor = 'transparent',
  hoverBgColor = 'bg-gray-200',
  w = 'w-5',
  h = 'h-5',
  p = 'p-2',
  variant,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={`${p} rounded-full cursor-pointer ${bgColor} hover:${hoverBgColor}`}
      {...props}
    >
      <div className={`${w} ${h} ${textColour} flex justify-center items-center`}>
        <Icon className={`${w} ${h} ${p} ${textColour} ${bgColor}`} variant={variant} />
      </div>
    </button>
  )
}

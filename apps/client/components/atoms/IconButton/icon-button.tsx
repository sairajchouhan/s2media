import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import { LeftNavIconComp } from '../../../types/icon'

export interface IconButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  // eslint-disable-next-line no-unused-vars
  icon: LeftNavIconComp
  variant?: 'solid' | 'outline'
  w?: string
  h?: string
  textColour?: string
  bgColor?: string
  hoverBgColor?: string
  p?: string
  hasFocus?: boolean
}

export const IconButton = ({
  icon: Icon,
  textColour = 'text-gray-600',
  bgColor = 'transparent',
  hoverBgColor = 'bg-gray-200',
  hasFocus = false,
  w = 'w-5',
  h = 'h-5',
  p = 'p-2',
  variant,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={`${p} rounded-full cursor-pointer ${bgColor} hover:${hoverBgColor} outline-none ${
        hasFocus ? 'focus:ring focus:ring-indigo-400' : ''
      }`}
      {...props}
    >
      <div className={`${w} ${h} ${textColour} flex justify-center items-center`}>
        <Icon className={`${w} ${h} ${p} ${textColour} ${bgColor}`} variant={variant} />
      </div>
    </button>
  )
}

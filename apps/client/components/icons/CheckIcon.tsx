import React from 'react'
import { IconProps } from '../../types'

export const CheckIcon = ({ w = 'w-6', h = 'h-6', color }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${w} ${h} ${color}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

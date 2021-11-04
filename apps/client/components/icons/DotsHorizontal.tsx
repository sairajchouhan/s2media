import React from 'react'
import { IconProps } from '../../types/icon'

export const DotsHorizontal = ({ w, h, color }: IconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${w} ${h} ${color}`} viewBox="0 0 20 20" fill="currentColor">
      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
    </svg>
  )
}

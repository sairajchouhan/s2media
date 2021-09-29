import React from 'react'
import { LeftNavIconProps } from '../../types'

export const SavedIcon = ({ variant, styling }: LeftNavIconProps) => {
  return (
    <>
      {variant === 'outline' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 ${styling}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      )}
      {variant === 'solid' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-6 h-6 ${styling}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
        </svg>
      )}
    </>
  )
}

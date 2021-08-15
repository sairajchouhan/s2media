import React from 'react'
import { NextImage } from '../Image'
import DummyUser from './dummyUser.svg'

interface AvatarProps {
  src?: string | null
  alt: string
  w?: string
  h?: string
}

export const Avatar = ({ src = null, alt, w = 'w-6', h = 'h-6' }: AvatarProps) => {
  if (src === null || !src) {
    return (
      <div className={`${w} ${h}`}>
        <NextImage roundedFull={true} src={DummyUser} alt={'dummyUser'} />
      </div>
    )
  }

  return (
    <div className={`${w} ${h}`}>
      <NextImage roundedFull={true} src={src} alt={alt} />
    </div>
  )
}

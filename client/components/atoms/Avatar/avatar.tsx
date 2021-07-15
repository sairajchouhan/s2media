import React from 'react'
import { NextImage } from '../Image'

interface AvatarProps {
  src: string
  alt: string
  w?: string
  h?: string
}

export const Avatar = ({ src, alt, w = 'w-6', h = 'h-6' }: AvatarProps) => {
  return (
    <div className={`${w} ${h}`}>
      <NextImage roundedFull={true} src={src} alt={alt} />
    </div>
  )
}

import Image from 'next/image'
import React from 'react'

interface AvatarProps {
  src: string
  alt: string
  w: number
  h: number
}

export const Avatar = ({ src, alt, w, h }: AvatarProps) => {
  return (
    <div className="grid place-items-center">
      <Image className="rounded-full" src={src} alt={alt} width={w} height={h} />
    </div>
  )
}

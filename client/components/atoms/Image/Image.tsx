import Image from 'next/image'
import React from 'react'

interface NextImageProps {
  src: string
  alt?: string
}

export const NextImage = ({ src, alt }: NextImageProps) => {
  return (
    <div className="imageContainer">
      <Image src={src} layout="fill" className="image" alt={alt} />
    </div>
  )
}

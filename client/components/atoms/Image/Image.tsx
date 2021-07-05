import Image from 'next/image'
import React from 'react'

interface NextImageProps {
  src: string
  alt?: string
  roundedFull?: boolean
}

export const NextImage = ({ src, alt, roundedFull, ...props }: NextImageProps) => {
  return (
    <div className="imageContainer" {...props}>
      <Image
        src={src}
        layout="fill"
        className={`image ${roundedFull ? 'rounded-full' : ''}`}
        alt={alt}
      />
    </div>
  )
}

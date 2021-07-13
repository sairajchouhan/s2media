import Image from 'next/image'
import React from 'react'

interface NextImageProps {
  src: string
  alt?: string
  roundedFull?: boolean
  objectFit?: any
  objectPosition?: any
}

export const NextImage = ({
  src,
  alt,
  roundedFull,
  objectFit,
  objectPosition,
  ...props
}: NextImageProps) => {
  return (
    <div className="imageContainer" {...props}>
      <Image
        src={src}
        layout="fill"
        className={`image ${roundedFull ? 'rounded-full' : ''}`}
        objectFit={objectFit}
        objectPosition={objectPosition}
        alt={alt}
      />
    </div>
  )
}

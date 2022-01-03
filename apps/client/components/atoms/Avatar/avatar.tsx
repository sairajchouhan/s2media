import React from 'react'

interface AvatarProps {
  src?: string | null
  alt?: string
  w?: string
  h?: string
}

export const Avatar = ({ src = null, alt, w = 'w-6', h = 'h-6' }: AvatarProps) => {
  if (src === null || !src) {
    return (
      <div className={`${w} ${h} `}>
        <img
          src="/dummyUser.svg"
          className="block w-full rounded-full"
          alt="Deafult User Profile"
        />
      </div>
    )
  }

  return (
    <div className={`${w} ${h} overflow-hidden rounded-full`}>
      <img src={src} alt={alt} className={`w-full`} />
    </div>
  )
}

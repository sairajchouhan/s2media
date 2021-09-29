import NextLink from 'next/link'
import React from 'react'

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string | { href: string }
  prefetch?: boolean
}

export const Link = ({ to, ...props }: IProps) => {
  if (typeof to === 'string') {
    return (
      <NextLink href={to}>
        <a {...props} />
      </NextLink>
    )
  }

  return (
    <NextLink href={to.href}>
      <a {...props} />
    </NextLink>
  )
}

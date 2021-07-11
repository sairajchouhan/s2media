import NextLink from 'next/link'
import React from 'react'

interface IProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string | { href: string }
  prefetch?: boolean
}

export const Link = ({ to, prefetch = true, ...props }: IProps, ref: any) => {
  if (typeof to === 'string') {
    return (
      <NextLink href={to} prefetch={prefetch || false}>
        <a {...props} ref={ref} />
      </NextLink>
    )
  }

  return (
    <NextLink href={to.href} prefetch={prefetch || false}>
      <a {...props} ref={ref} />
    </NextLink>
  )
}

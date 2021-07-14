import React from 'react'

// an interface having children
export interface ModelBodyProps {
  children: React.ReactChild
}

export const ModelBody = ({ children }: ModelBodyProps) => {
  return <div>{children}</div>
}

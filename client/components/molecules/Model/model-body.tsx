import React from 'react'

// an interface having children
export interface ModelBodyProps {
  children: React.ReactChild | React.ReactChild[]
}

export const ModelBody = ({ children }: ModelBodyProps) => {
  return <div className="mt-2">{children}</div>
}

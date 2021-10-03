import React from 'react'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-full border-l border-r border-opacity-80">{children}</div>
}

import React from 'react'

// interface for this component's props.
export interface ModelFooterProps {
  primaryAction?: () => void
  primaryActionTitle?: () => string
  children: React.ReactChild | React.ReactChild[]
}

export const ModelFoot = ({ children }: ModelFooterProps) => {
  return <div className="">{children}</div>
}

import React from 'react'

// interface for this component's props.
export interface ModelFooterProps {
  primaryAction?: () => void
  primaryActionTitle?: () => string
  children: React.ReactChild
}

export const ModelFoot = ({ children }: ModelFooterProps) => {
  return <div className="flex items-center justify-end mt-6">{children}</div>
}

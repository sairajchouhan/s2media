import React from 'react'

let circleCommonClasses = 'h-2 w-2 bg-current rounded-full'
export const Loader = () => {
  return (
    <div className="flex space-x-1" data-testid="button-loader">
      <div className={`${circleCommonClasses} animate-bounce`}></div>
      <div className={`${circleCommonClasses} animate-bounce-200d`}></div>
      <div className={`${circleCommonClasses} animate-bounce-400d`}></div>
    </div>
  )
}

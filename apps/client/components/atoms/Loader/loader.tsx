import React from 'react'

export const Loader = () => {
  let circleCommonClasses = 'h-2 w-2 bg-current rounded-full'
  return (
    <div className="flex space-x-1">
      <div className={`${circleCommonClasses} animate-bounce`}></div>
      <div className={`${circleCommonClasses} animate-bounce-200d`}></div>
      <div className={`${circleCommonClasses} animate-bounce-400d`}></div>
    </div>
  )
}

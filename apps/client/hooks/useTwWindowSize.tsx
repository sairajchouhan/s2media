import { useEffect, useState } from 'react'

export type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '_'

const getScreenSize = (width: number) => {
  let screenSize: ScreenSize = '_'

  if (width < 768 && width >= 640) {
    screenSize = 'sm'
  }
  if (width < 1024 && width >= 768) {
    screenSize = 'md'
  }
  if (width < 1280 && width >= 1024) {
    screenSize = 'lg'
  }
  if (width < 1536 && width >= 1280) {
    screenSize = 'xl'
  }
  if (width >= 1536) {
    screenSize = '2xl'
  }
  return screenSize
}

export const useTwWindowSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
    if (typeof window !== 'undefined') {
      return getScreenSize(window.innerWidth)
    } else {
      return '_'
    }
  })

  useEffect(() => {
    const resizeCallBack = (e: any) => {
      const width = e.target.outerWidth
      setScreenSize(getScreenSize(width))
    }

    window.addEventListener('resize', resizeCallBack)
    return () => {
      window.removeEventListener('resize', resizeCallBack)
    }
  }, [])

  return { screenSize }
}

import { useRouter } from 'next/router'
import React from 'react'
import { IconButton } from '../../atoms/IconButton'
import { BackIcon } from '../../icons'

interface PageNavProps {
  title: string
  subtitle?: string
}

export const PageNav = ({ title, subtitle }: PageNavProps) => {
  const { back } = useRouter()
  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="flex items-center w-full p-2 border-b border-opacity-80">
        <div className="mr-2">
          <IconButton icon={BackIcon} onClick={() => back()} hoverBgColor="bg-blue-50" />
        </div>
        <div className="flex flex-col">
          <p className={`text-lg font-extrabold cursor-default ${subtitle ? 'leading-5' : ''} `}>{title}</p>
          {subtitle && (
            <a role="link" className="text-sm leading-4 text-gray-500 cursor-pointer">
              {subtitle}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

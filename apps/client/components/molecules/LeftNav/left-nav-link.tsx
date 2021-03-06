import React from 'react'
import { LeftNavIconComp } from '../../../types/icon'

export type LeftNavLinkProps = {
  active: boolean
  isCountable?: boolean
  countValue?: number
  icon: LeftNavIconComp
  onClick: () => void
  children: React.ReactNode
}

export const LeftNavLink = ({
  active,
  isCountable,
  icon: Icon,
  onClick,
  countValue,
  children,
}: LeftNavLinkProps) => {
  return (
    <li
      onClick={onClick}
      className="flex items-center justify-center w-full text-gray-600 cursor-pointer select-none lg:justify-start group"
    >
      <button className="flex items-center py-2 rounded-full lg:px-6 lg:group-hover:bg-indigo-50 ">
        <div className="relative">
          {countValue && isCountable && !active && countValue > 0 ? (
            <div className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-indigo-500 rounded-full -top-1 left-3">
              <span className="block">{countValue}</span>
            </div>
          ) : null}
          <Icon variant={active ? 'solid' : 'outline'} styling="text-indigo-600 lg:mr-4" />
        </div>
        <p
          className={`hidden lg:block text-lg font-bold group-hover:text-indigo-500 ${
            active ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          {children}
        </p>
      </button>
    </li>
  )
}

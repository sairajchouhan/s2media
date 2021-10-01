import React from 'react'
import { LeftNavIconComp } from '../../../types/icon'

export type LeftNavLinkProps = {
  active: boolean
  icon: LeftNavIconComp
  onClick: () => void
  children: React.ReactNode
}

export const LeftNavLink = ({ active, icon: Icon, onClick, children }: LeftNavLinkProps) => {
  return (
    <li
      onClick={onClick}
      className="flex items-center justify-start w-full text-gray-600 cursor-pointer select-none group"
    >
      <button className="flex items-center px-6 py-2 rounded-full group-hover:bg-indigo-50 ">
        <Icon variant={active ? 'solid' : 'outline'} styling="text-indigo-600 mr-4" />
        <p
          className={`text-lg font-bold group-hover:text-indigo-500 ${
            active ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          {children}
        </p>
      </button>
    </li>
  )
}

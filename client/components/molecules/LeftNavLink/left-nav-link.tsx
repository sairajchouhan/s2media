import React from 'react'

export type LeftNavLinkProps = {
  active: boolean
  icon: typeof React.Component
  onClick: () => void
  children: React.ReactNode
}

export const LeftNavLink = ({ active, icon: Icon, onClick, children }: LeftNavLinkProps) => {
  return (
    <li
      onClick={onClick}
      className="flex items-center justify-start px-8 py-4 text-gray-500 transition rounded-lg cursor-pointer select-none group hover:bg-indigo-50"
    >
      <Icon
        className={`w-6 h-6 mr-6 text-lg text-gray-500 group-hover:text-indigo-500 ${
          active ? 'text-indigo-500' : 'text-gray-500'
        }`}
      />
      <p
        className={`text-xl font-bold group-hover:text-indigo-500 ${
          active ? 'text-indigo-500' : 'text-gray-500'
        }`}
      >
        {children}
      </p>
    </li>
  )
}

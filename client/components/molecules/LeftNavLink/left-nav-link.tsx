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
      className="flex items-center justify-start w-full text-gray-600 cursor-pointer select-none group"
    >
      <div className="flex items-center px-6 py-2 rounded-full group-hover:bg-indigo-50 ">
        <Icon
          className={`w-5 h-5 mr-4 text-lg text-gray-600 group-hover:text-indigo-600 ${
            active ? 'text-indigo-600' : 'text-gray-600'
          }`}
        />
        <p
          className={`text-lg font-bold group-hover:text-indigo-500 ${
            active ? 'text-indigo-600' : 'text-gray-600'
          }`}
        >
          {children}
        </p>
      </div>
    </li>
  )
}

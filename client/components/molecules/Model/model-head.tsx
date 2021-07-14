import { Dialog } from '@headlessui/react'
import React from 'react'
import Cancel from '../../../assets/svgs/cancel.svg'
import { IconButton } from '../../atoms/IconButton/icon-button'

export interface ModelHeadProps {
  title?: string
  toggleOpen: () => void
  icon?: typeof React.Component
}

export const ModelHead = ({ title, toggleOpen, icon: Icon }: ModelHeadProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
          {title}
        </Dialog.Title>
        <IconButton
          onClick={() => toggleOpen()}
          icon={Icon ? Icon : Cancel}
          hoverBgColor="bg-blue-50"
        />
      </div>
      <span className="block w-full h-px my-2 bg-gray-200"></span>
    </>
  )
}

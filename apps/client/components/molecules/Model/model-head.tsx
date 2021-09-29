import { Dialog } from '@headlessui/react'
import React from 'react'
import { IconButton } from '../../atoms/IconButton/icon-button'
import { CancenIcon } from '../../icons'

export interface ModelHeadProps {
  toggleOpen: () => void
  title?: string
}

export const ModelHead = ({ title, toggleOpen }: ModelHeadProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
          {title}
        </Dialog.Title>
        <IconButton onClick={() => toggleOpen()} icon={CancenIcon} hoverBgColor="bg-blue-50" />
      </div>
      <span className="block w-full h-px my-2 bg-gray-200"></span>
    </>
  )
}

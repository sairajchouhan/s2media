/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from '@headlessui/react'
import React, { Dispatch, Fragment, SetStateAction } from 'react'
import { ModelBody } from './model-body'
import { ModelFoot } from './model-foot'
import { ModelHead } from './model-head'

export interface ModelProps {
  open: boolean
  toggleOpen: Dispatch<SetStateAction<boolean>>
  initialFoucsRef?: any
  center?: boolean
  children: React.ReactNode
}

export const BaseModel = ({
  open,
  toggleOpen,
  initialFoucsRef,
  center = false,
  children,
}: ModelProps) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          initialFocus={initialFoucsRef}
          as="div"
          className="fixed inset-0 z-20 overflow-y-auto"
          onClose={toggleOpen}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={'div'}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {center ? (
              <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
              </span>
            ) : null}

            <Transition.Child
              as="div"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl px-4 py-4 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export const Model = Object.assign(BaseModel, {
  Head: ModelHead,
  Body: ModelBody,
  Foot: ModelFoot,
})

import { Transition } from '@headlessui/react'
import React, { createContext, useContext } from 'react'
import { CheckIcon, ExclaimationIcon } from '../components/icons'

// eslint-disable-next-line no-unused-vars
const ToastContext = createContext<({ message, duration, type }: ToastArgs) => void>(() => {
  return
})

export const useToast = () => useContext(ToastContext)

type ToastArgs = {
  duration?: number
  message: string
  type: 'success' | 'error'
}

const getToastBg = (type: 'success' | 'error') => {
  switch (type) {
    case 'success':
      return 'rgb(16, 185, 129)'
    case 'error':
      return 'rgb(239, 68, 68)'
    default:
      return 'rgb(16, 185, 129)'
  }
}

const getToastIcon = (type: 'success' | 'error') => {
  switch (type) {
    case 'success':
      return <CheckIcon w="w-6" h="h-6" color="text-white" />
    case 'error':
      return <ExclaimationIcon w="w-6" h="h-6" color="text-white" />
    default:
      return <CheckIcon w="w-6" h="h-6" color="text-white" />
  }
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [toastInfo, setToastInfo] = React.useState<ToastArgs>({
    message: '',
    type: 'success',
  })

  const toast = ({ duration = 300000, message, type }: ToastArgs) => {
    if (message.trim() === '') return
    setToastInfo({ message, type })
    setIsOpen(true)
    setTimeout(async () => {
      setIsOpen(false)
      await new Promise((res) => setTimeout(res, 250))
      setToastInfo((info) => ({ ...info, message: '' }))
    }, duration)
  }

  return (
    <>
      <ToastContext.Provider value={toast}>
        <Transition appear show={isOpen} as={React.Fragment}>
          <div
            className="absolute bottom-0 z-50"
            style={{
              left: '50%',
              marginBottom: '1rem',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="flex items-end justify-center px-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div
                  className={`inline-block w-full max-w-md px-4 py-3 overflow-hidden text-left align-middle transition-all transform  rounded-md shadow-xl`}
                  style={{ backgroundColor: getToastBg(toastInfo.type) }}
                >
                  <div className="flex items-center ">
                    {getToastIcon(toastInfo.type)}
                    <span className="mx-1"></span>
                    <h3 className="text-lg font-medium text-white">{toastInfo.message}</h3>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Transition>
        {children}
      </ToastContext.Provider>
    </>
  )
}

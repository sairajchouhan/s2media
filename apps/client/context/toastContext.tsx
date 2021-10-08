import { Dialog } from '@headlessui/react'
import React, { createContext, useContext } from 'react'

const ToastContext = createContext<any>({ message: '' })
export const useToast = () => useContext(ToastContext)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [message, setMessage] = React.useState('')

  const toast = ({ duration = 3000, message }: { duration: number; message: string }) => {
    if (message.trim() === '') return
    setMessage(message)
    setIsOpen(true)
    setTimeout(() => {
      setIsOpen(false)
      setMessage('')
    }, duration)
  }

  return (
    <>
      <ToastContext.Provider value={{ toast }}>
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Overlay />

          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>This will permanently deactivate your account</Dialog.Description>

          <p>{message}</p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog>
      </ToastContext.Provider>
      {children}
    </>
  )
}

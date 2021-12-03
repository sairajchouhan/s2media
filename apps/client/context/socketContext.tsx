import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useAuth } from './authContext'

const SocketContext = React.createContext<any>(null)

export function useSocket() {
  return useContext(SocketContext)
}

interface ISocketContext {
  children: React.ReactNode
}

export function SocketProvider({ children }: ISocketContext) {
  const { rqUser } = useAuth()
  const [notifications, setNotifications] = useState<any>(null)

  useEffect(() => {
    const socket = io('http://localhost:8080', {})
    socket.on('NOTIFICATION', (data) => {
      setNotifications(data)
      console.log(data)
    })

    if (rqUser) {
      console.log('Emitting GIVE_MY_NOTIFICATIONS')
      socket.emit('GIVE_MY_NOTIFICATIONS', {
        userId: rqUser.uid,
        socketId: socket.id,
      })
    }

    return () => {
      socket.close()
    }
  }, [rqUser])

  return <SocketContext.Provider value={notifications}>{children}</SocketContext.Provider>
}

import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useAuth } from './authContext'
import { SERVER_BASE_URL } from '../config/axios'

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
    const socket = io(SERVER_BASE_URL, {})
    socket.on('NOTIFICATION', (data) => {
      console.log('GOT NOTIFICATIONS')
      setNotifications(data)
      console.log(data)
    })
    socket.emit('JOIN_USER_ROOM', rqUser.uid)
    if (rqUser) {
      console.log('Emitting GIVE_MY_NOTIFICATIONS')
      socket.emit('GIVE_MY_NOTIFICATIONS', {
        userId: rqUser.uid,
      })
    }
    return () => {
      socket.close()
    }
  }, [rqUser])

  return <SocketContext.Provider value={notifications}>{children}</SocketContext.Provider>
}

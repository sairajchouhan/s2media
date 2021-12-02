import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'

const SocketContext = React.createContext<Socket | null>(null)

export function useSocket() {
  return useContext(SocketContext)
}

interface ISocketContext {
  children: React.ReactNode
}

export function SocketProvider({ children }: ISocketContext) {
  const [socket, setSocket] = useState<null | Socket>(null)

  useEffect(() => {
    const socket = io('http://localhost:8080', {})
    setSocket(socket)

    return () => {
      socket.close()
    }
  }, [])

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
}

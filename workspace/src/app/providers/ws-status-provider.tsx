'use client'
 
import { createContext, useState } from 'react'
 
export const WebSocketContext = createContext({})
 
export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode
}) {
    const [isRead, setIsRead] = useState()
        
    return (
        <WebSocketContext.Provider value={{isRead, setIsRead}}>
            {children}
        </WebSocketContext.Provider>)
}
"use client"

import { WebSocketContext } from "@/app/providers/ws-status-provider"
import { useContext } from "react"

export function WsStatus() {
    const { isRead }= useContext(WebSocketContext) as {isRead: boolean} 
    return (
        !isRead ? <span className="text-rose-500">Disconnected</span> : <span className="text-emerald-500">Connected</span>
    )
}
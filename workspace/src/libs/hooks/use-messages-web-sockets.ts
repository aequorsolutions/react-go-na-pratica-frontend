import { useQueryClient } from "@tanstack/react-query"
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import type { GetRoomMessagesResponse } from "../http/get-room-messages"
import useWebSocket from "react-use-websocket";
import { WebSocketContext } from "@/app/providers/ws-status-provider";

interface useMessagesWebSocketsParams {
  roomId: string
}

type WebhookMessage =
  | { kind: "message_created"; value: { id: string, message: string } }
  | { kind: "message_answered"; value: { id: string } }
  | { kind: "message_reaction_increased"; value: { id: string; count: number } }
  | { kind: "message_reaction_decreased"; value: { id: string; count: number } };

export function useMessagesWebSockets({
  roomId,
}: useMessagesWebSocketsParams) {
  const queryClient = useQueryClient()
  const { setIsRead }= useContext(WebSocketContext) as {setIsRead: Dispatch<SetStateAction<boolean>>} 
  const { lastJsonMessage, readyState } = useWebSocket(`${process.env.NEXT_PUBLIC_BACKEND_WS}/${roomId}`, {
                                            shouldReconnect: (closeEvent) => true, 
                                            heartbeat: true,
                                            onOpen: () => {
                                              console.log('Websocket connected!')
                                              setIsRead(true)
                                            },
                                            onClose: () => {
                                              console.log('Websocket connection closed!')
                                              setIsRead(false)
                                            }
                                          })

  useEffect(() => {
    // const ws = new WebSocket(`${process.env.NEXT_PUBLIC_BACKEND_WS}/${roomId}`)
    
    // ws.onopen = () => {
    //   console.log('Websocket connected!')
    //   setIsReady(true)
    // }

    // ws.onclose = () => {
    //   console.log('Websocket connection closed!')
    //   setIsReady(false)
    // }

    // ws.onmessage = (event) => {
      const data: WebhookMessage = lastJsonMessage as WebhookMessage
      if (!data) {
        return
      }
      switch(data.kind) {
        case 'message_created':
          queryClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {
            return {
              messages: [
                ...(state?.messages ?? []),
                {
                  id: data.value.id,
                  text: data.value.message,
                  amountOfReactions: 0,
                  answered: false,
                  moderated: false,
                }
              ],
            }
          })

          break;
        case 'message_answered':
          queryClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {
            if (!state) {
              return undefined
            }

            return {
              messages: state.messages.map(item => {
                if (item.id === data.value.id) {
                  return { ...item, answered: true }
                }

                return item
              }),
            }
          })

          break;
        case 'message_reaction_increased':
        case 'message_reaction_decreased':
          queryClient.setQueryData<GetRoomMessagesResponse>(['messages', roomId], state => {
            if (!state) {
              return undefined
            }

            return {
              messages: state.messages.map(item => {
                if (item.id === data.value.id) {
                  return { ...item, amountOfReactions: data.value.count }
                }

                return item
              }),
            }
          })

          break;
      }
    // }

    // return () => {
    //   ws.close()
    // }
  }, [lastJsonMessage, queryClient, roomId])
  return [readyState]
}
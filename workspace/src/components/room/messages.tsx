"use client"
import { getRoomMessages } from "@/libs/http/get-room-messages";
import { Message } from "./message";
import { useQuery } from "@tanstack/react-query";
import { LoaderPinwheel } from "lucide-react";
import { useMessagesWebSockets } from "@/libs/hooks/use-messages-web-sockets";
import { useRouter } from "next/navigation";

interface ListofMessagesProps {
    roomId: string
}

export function ListOfMessages({roomId}: ListofMessagesProps) {
    const router = useRouter()

    const { data, isLoading } = useQuery({
        queryKey: ['messages', roomId],
        queryFn: async () => await getRoomMessages({ roomId }),
      })

    useMessagesWebSockets({ roomId })

    if( data?.messages[0]?.id == 'invalid room' ){
        router.push('/create-room')
    }
    
    const sortedMessages = data?.messages.sort((a, b) => {
        return b.amountOfReactions - a.amountOfReactions
      })
    
    return (
        !isLoading ? ( 
            data?.messages.length === 0 ? <p className="mx-auto mt-10"> Nenhuma mensagem recebida até o momento</p> : (
                <ol className="list-decimal list-outside px-3 space-y-8">
                
                {sortedMessages?.map((item) => {
                    return (
                        <Message key={item.id} id={item.id} text={item.text} reactions={item.amountOfReactions} answered={item.answered} moderated={item.moderated} />
                    )
                })}
            </ol>
            )
            
            ) : (
                <p className="flex mx-auto gap-4 mt-10"><LoaderPinwheel className="animate-spin" /> Carregando... </p>
            )
    )
}
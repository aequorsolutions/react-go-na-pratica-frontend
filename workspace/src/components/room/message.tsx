"use client"
import { createMessageReaction } from "@/libs/http/create-message-reaction";
import { removeMessageReaction } from "@/libs/http/remove-message-reaction";
import { ArrowUp } from "lucide-react";
import { useParams } from "next/navigation";
import router from "next/router";
import { useState } from "react";
import { toast } from "sonner";

interface MessageProps {
    id: string
    text: string
    reactions: number
    answered?: boolean
    moderated?: boolean
}

export function Message({id: messageId, text, reactions, answered=false, moderated=false}:MessageProps) {
    const [hasReacted, setHasReacted] = useState(false)
    const {room_id} = useParams()
    // console.log(room_id)
    if (!room_id) {
        router.push('/create-room')
    }

    async function CreateReactionToMessage() {
        try {
            await createMessageReaction({roomId:room_id as string,messageId})
        } catch {
            toast.error("Erro ao reagir a mensagem")
        }
        setHasReacted(true)
    }
    async function RemoveReactionFromMessage() {
        try {
            await removeMessageReaction({roomId:room_id as string,messageId})
        } catch {
            toast.error("Erro ao descurtir a mensagem")
        }
        setHasReacted(false)
    }

    return (
        <li data-answered={answered} data-moderated={moderated} className="ml-4 leading-relaxed text-zinc-100 data-[answered=true]:opacity-50 data-[answered=true]:pointer-events-none data-[moderated=true]:hidden">
            {text}

            {hasReacted ? (
                <button onClick={RemoveReactionFromMessage} type="button" className="mt-3 flex items-center gap-2 text-orange-400 text-sm font-medium hover:text-orange-500">
                    <ArrowUp className="size-4" />
                    Curtir pergunta ({reactions})
                </button>
            ) : (
                <button onClick={CreateReactionToMessage} type="button" className="mt-3 flex items-center gap-2 text-zinc-400 text-sm font-medium hover:text-zinc-300">
                    <ArrowUp className="size-4" />
                    Curtir pergunta ({reactions})
                </button>
            )}
            
        </li>
    )
}
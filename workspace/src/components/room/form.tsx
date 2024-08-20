"use client"

import { useRouter, useParams } from 'next/navigation'

import { ArrowRight} from "lucide-react"
import { createMessage } from '@/libs/http/create-message'
import { toast } from 'sonner'

export function FormSendMessage() {
    const router = useRouter()
    const {room_id} = useParams()
    // console.log(room_id)
    if (!room_id) {
        router.push('/create-room')
    }

    async function handleSubmit(data: FormData){
        // e.preventDefault()
        const message = data.get("message")?.toString()
        console.log(message)
        
        if (!message || !room_id) {
            return
        }

        try {
            const data = await createMessage({ message, roomId: room_id as string })
            
            // router.push(`/room/${data.roomID}`)
        } catch (error) {
            toast.error("Erro ao criar nova mensagem")
        }
        // router.push("/room/" + theme)
    }
    return (
        <form action={handleSubmit} className="flex gap-4 flex-col md:flex-row bg-zinc-900 border border-zinc-800 rounded-xl w-full p-2 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1">
            <input 
                    type="text"
                    name= "message"
                    placeholder="Qual é a sua pergunta?"
                    autoComplete="off"
                    className="flex-1 bg-transparent text-sm mx-2 outline-none placeholder:text-zinc-500 text-zinc-100" />
            <button type="submit" className="bg-orange-400 hover:bg-orange-500 transition-colors text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg justify-center font-medium text-sm"> 
                Criar pergunta <ArrowRight className="size-4"/>
            </button>
        </form>
    )
}
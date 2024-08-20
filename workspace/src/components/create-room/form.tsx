"use client"

import { useRouter } from 'next/navigation'

import { ArrowRight} from "lucide-react"
import { createRoom } from '@/libs/http/create-room'
import { toast } from 'sonner'

export function FormCreateRoom() {
    const router = useRouter()

    async function handleCreateRoom(data: FormData){

        const theme = data.get("theme")?.toString()
        const secret = data.get("secret")?.toString()

        if (!theme) {
            return
        }

        try {
            const data = await createRoom({ theme, secret })
            router.push(`/room/${data.roomID}`)
        } catch (error) {
            toast.error("Erro ao criar nova sala")
        }

    }
    return (
        <form action={handleCreateRoom} className="flex flex-col w-full gap-6">
            <div className='flex flex-col gap-4 md:flex-row bg-zinc-900 border border-zinc-800 rounded-xl w-full p-2 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1'>
                <input 
                        type="text"
                        name= "theme"
                        placeholder="Nome da Sala"
                        autoComplete="off"
                        required
                        className="flex-1 bg-transparent text-sm mx-2 outline-none placeholder:text-zinc-500 text-zinc-100" />
                <button type="submit" className="bg-orange-400 hover:bg-orange-500 transition-colors text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg justify-center font-medium text-sm"> 
                    Criar Sala <ArrowRight className="size-4"/>
                </button>

            </div>
                <input 
                        type="text"
                        name= "secret"
                        placeholder="Insira uma senha utilizada para deletar a sala"
                        autoComplete="off"
                        className="flex-1 placeholder:text-zinc-500 bg-zinc-900 outline-none border border-zinc-800 rounded-xl w-full py-3.5 px-3 ring-orange-400 ring-offset-2 ring-offset-zinc-950 focus-within:ring-1" />
        </form>
    )
}
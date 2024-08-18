"use client"

import { Share2 } from "lucide-react"
import { toast } from "sonner"

export function ButtonShare() {
    function handleShareRoom() {
        const url = window.location.href.toString()
        
        if (navigator.share != undefined && navigator.canShare()) {
            navigator.share({url})
            return
        }
        navigator.clipboard.writeText(url)
        toast.info('Endereço copiado com sucesso!')
    }
    return (
        <button type="submit" onClick={handleShareRoom} className="ml-auto bg-zinc-800 hover:bg-zinc-700 transition-colors text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg justify-center font-medium text-sm"> 
            Compartilhar <Share2 className="size-4"/>
        </button>
    )
}
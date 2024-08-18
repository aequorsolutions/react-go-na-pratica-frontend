import Image from "next/image"

import logo from "@/assets/ama-logo.svg"
import { FormCreateRoom } from "@/components/create-room/form"

export default function CreateRoom() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
            <div className="z-10 w-full flex-1 max-w-md items-center justify-center font-mono text-sm flex flex-col gap-6">
                <Image src={logo} alt="Logo Ask me Anything" className="h-10 w-10"/>
                <p className="text-center text-zinc-300 leading-relaxed">Crie uma sala pública, receba perguntas e priorize as mais curtidas.</p>
                <FormCreateRoom />
            </div>
        </main>
    )
}
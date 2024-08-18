import Image from "next/image"

import { FormSendMessage } from "@/components/room/form"
import { ButtonShare } from "@/components/room/buttonShare"

import logo from "@/assets/ama-logo.svg"
import { ListOfMessages } from "@/components/room/messages"
import { Suspense } from "react"
// import { getRoomMessages } from "@/libs/http/get-room-messages"

export default function Room({ params }: { params: { room_id: string } }) {
    // const data = await getRoomMessages({roomId: params.room_id})
    // console.log(data)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-4">
            <div className="z-10 mx-auto w-full max-w-2xl flex flex-col gap-6 py-10 px-4">
                
                <div className="flex items-center gap-3 px-3">
                    <Image src={logo} alt="AMA" className="h-5"/>
                    <span className="text-sm text-zinc-500 truncate">
                        Código da Sala: <span className="text-zinc-300">{params.room_id}</span>
                    </span>

                    <ButtonShare />

                </div>

                <div className="h-px w-full bg-zinc-900"/>

                <FormSendMessage />
                {/* <Suspense fallback={<h1>Carregando...</h1>}> */}
                    <ListOfMessages roomId={params.room_id}/>
                {/* </Suspense> */}
            </div>
        </main>
    )
}
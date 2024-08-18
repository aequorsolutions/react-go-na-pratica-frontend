interface CreateRoomRequest {
    theme: string
    secret?: string
}

export async function createRoom({theme, secret=''}: CreateRoomRequest) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms`, {
        method: "POST",
        body: JSON.stringify({
            theme,
            secret
        })
    })

    const data: {id: string} = await response.json()

    return ({ roomID : data.id})
}
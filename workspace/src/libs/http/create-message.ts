interface CreateMessageRequest {
    roomId: string
    message: string
}

export async function createMessage({roomId, message}: CreateMessageRequest) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${roomId}/messages`, {
        method: "POST",
        body: JSON.stringify({
            message
        })
    })

    const data: {id: string} = await response.json()

    return ({ messageId : data.id})
}
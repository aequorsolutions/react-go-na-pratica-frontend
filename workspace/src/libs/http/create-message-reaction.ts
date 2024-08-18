interface CreateMessageReactionProps {
    roomId: string
    messageId: string
}

export async function createMessageReaction({roomId, messageId}: CreateMessageReactionProps) {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${roomId}/messages/${messageId}/react`, {
        method: "PATCH"
    })
}
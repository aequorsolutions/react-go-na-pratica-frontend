interface RemoveMessageReactionProps {
    roomId: string
    messageId: string
}

export async function removeMessageReaction({roomId, messageId}: RemoveMessageReactionProps) {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/rooms/${roomId}/messages/${messageId}/react`, {
        method: "DELETE"
    })
}
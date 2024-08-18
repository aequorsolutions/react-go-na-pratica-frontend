interface CreateRoomRequest {
    roomId: string
}

export interface GetRoomMessagesResponse {
    messages: {
      id: string;
      text: string;
      amountOfReactions: number;
      answered?: boolean;
      moderated?: boolean;
    }[]
  }

const URL = process.env.NEXT_PUBLIC_BACKEND_URL as String

export async function getRoomMessages({ roomId }: CreateRoomRequest): Promise<GetRoomMessagesResponse> {
    // const response = await fetch(`http://localhost:8080/api/rooms/${roomId}/messages`)
    const response = await fetch(`${URL}/rooms/${roomId}/messages`)
    if(!response.ok){
        return {
        messages: [{
            id: "invalid room",
            text: '',
            amountOfReactions: 0
        }],
        }
    }
    const data: Array<{
        ID: string
        RoomID: string
        Message: string
        ReactionCount: number
        Answered: boolean
        Moderated: boolean
    }> = await response.json()

    return {
        messages: data.map(item => {
            return {
                id: item.ID,
                text: item.Message,
                amountOfReactions: item.ReactionCount,
                answered: item.Answered,
                moderated: item.Moderated
            }
        })
    }
}
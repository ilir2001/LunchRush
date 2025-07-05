export type Participant = {
    id: string
    name: string
    meal: string
}

export type LunchSession = {
    id: string
    participants: Participant[]
    restaurant: string
    dishes: string[]
    locked: boolean
}
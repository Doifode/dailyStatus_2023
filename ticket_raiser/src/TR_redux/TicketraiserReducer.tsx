import { typeAction } from "../TR_components/TR_constants"
import { RAISE_TICKET } from "./Types"

const initalState = {
    TICKETS: []
}
export const TicketReducer = (state = initalState, action: typeAction) => {

    switch (action.type) {
        case RAISE_TICKET: {
            console.log('ticketraiser', action.payload)
            localStorage.setItem("ticketRaise", JSON.stringify([state.TICKETS]))
            return {
                ...state, TICKETS: action.payload
            }

        }
        default: return { ...state }

    }

}
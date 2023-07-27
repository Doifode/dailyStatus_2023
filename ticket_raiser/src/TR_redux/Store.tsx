import { combineReducers, createStore } from "redux"
import { reducer } from "./Reducer"
import { TicketReducer } from "./TicketraiserReducer"

const rootReducer = combineReducers({
    USER: reducer,
    TICKET: TicketReducer
})
const store = createStore(rootReducer)

export default store
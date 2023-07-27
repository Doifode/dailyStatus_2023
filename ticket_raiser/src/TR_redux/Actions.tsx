import { IRegisterUser, IraiseTicket } from "../TR_components/TR_constants"
import { EDIT_USER_DATA, GET_LOCAL_STOREAGE_DATA, RAISE_TICKET, SAVE_USER_TO_LOCAL } from "./Types"

export const saveusertolocal = (payload: any) => {
    return { type: SAVE_USER_TO_LOCAL, payload }
}
export const getlocalstoragedata = () => {
    return { type: GET_LOCAL_STOREAGE_DATA }
}
export const edituserdata = (payload: IRegisterUser) => {
    return { type: EDIT_USER_DATA, payload }

}
export const raiseticket = (payload: IraiseTicket) => {
    return { type: RAISE_TICKET, payload }

}
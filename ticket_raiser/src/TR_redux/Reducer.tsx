import { IRegisterUser } from "../TR_components/TR_constants"
import { edituserdata } from "./Actions"
import { EDIT_USER_DATA, GET_LOCAL_STOREAGE_DATA, RAISE_TICKET, SAVE_USER_TO_LOCAL } from "./Types"

const initialValues: any = {
    USER_INFO: [],
 
}

export const reducer = (state = initialValues, action: any) => {
    switch (action.type) {
        case SAVE_USER_TO_LOCAL: return {
            ...state, USER_INFO: action.payload
        }
        case GET_LOCAL_STOREAGE_DATA: {
            const getlocal: any = localStorage.getItem("userList")
            const parse = JSON.parse(getlocal)
            return {
                ...state, USER_INFO: parse
            }
        }
        case EDIT_USER_DATA: {
            const { Fname, Lname, Email, Mobile, Username, Password, Role, id } = action?.payload
            const editedUser = state.USER_INFO.map((i: IRegisterUser) => {
                if (Number(i.id) === Number(id)) {
                    console.log('hi its okay to not okay')
                    return { ...i, Fname: Fname, Lname: Lname, Email: Email, Mobile: Mobile, Password: Password, Role: Role, id: id, Username: Username }
                }
                return i
            })
            return {
                ...state, USER_INFO: editedUser
            }
        }
        

        default: return { ...state }

    }

}
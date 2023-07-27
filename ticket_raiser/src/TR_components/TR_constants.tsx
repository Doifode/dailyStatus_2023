import * as Yup from "yup"
//Interfaces
export interface IUserLogin_Int {
    userName: string;
    passWord: string;
    readonly role: number
}
export interface IRegisterUser {
    id: number,
    Fname: string,
    Password: string,
    Mobile: number,
    Lname: string,
    Email: string,
    Username: string,
    Role: number
}
export type IRegisterUser_Array = {
    id: number,
    Fname: string,
    Password: string,
    Mobile: number,
    Lname: string,
    Email: string,
    Username: string
    Role: number
}[]
export type initialStateType = {
    USER_INFO: IRegisterUser[]
}
export interface IraiseTicket {
    query: string,
    priority: number,
    asignto: number,
    description: string,
    image: string
}


//yup validation 
export const UserLogin_val = Yup.object({
    userName: Yup.string().required(),
    passWord: Yup.string().required()
})
export const CreateUser_val = Yup.object({
    Fname: Yup.string().required(),
    Password: Yup.string().required(),
    Mobile: Yup.number().required(),
    Lname: Yup.string().required(),
    Email: Yup.string().required(),
    Username: Yup.string().required()
})
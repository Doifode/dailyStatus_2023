import { useDispatch, useSelector } from "react-redux"
import { IRegisterUser, IRegisterUser_Array } from "../TR_constants"
import { useEffect, useState } from "react"
import { getlocalstoragedata, saveusertolocal } from "../../TR_redux/Actions"
import { TR_modal } from "./TR_modal"
import { TR_createUser } from "../TR_dashboard/TR_createUser"
export const TR_table = () => {
    const state = useSelector((state: any) => state.USER);
    const [tableData, setTableData] = useState<IRegisterUser_Array>([])
    const [openFormmodal, setOpenformmodal] = useState<boolean>(false);
    const [singleUser, setSingleUser] = useState<IRegisterUser>()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getlocalstoragedata())
    }, [])
    useEffect(() => {
        setTableData(state.USER_INFO)

    }, [state])
    const EditUser = (item: IRegisterUser) => {
        setSingleUser(item)
        setOpenformmodal(true)

    }
    console.log(state.USER_INFO, "tbaleStates")
    return (
        <div>
            {!openFormmodal ? <div className="row mt-5">
                <div className="card">
                    <div className="card-body">
                        <table className="table table-bordered table-dark table-hover ">
                            <tbody>
                                <tr className="text-center">
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>UserName</th>
                                    <th>Password</th>
                                    <th>User Role</th>
                                    <th>Action</th>
                                </tr>
                                {
                                    state.USER_INFO.length > 0 ? tableData?.map((item: IRegisterUser) => {
                                        return <tr className="text-center">
                                            <td> {`${item.Fname} ${item.Lname}`}</td>
                                            <td>  {item.Email} </td>
                                            <td>  {item.Mobile} </td>
                                            <td>  {item.Username} </td>
                                            <td>  {item.Password} </td>
                                            <td> {`${item.Role === 0 ? "Admin" : item.Role === 2 ? "Worker" : "Helper"}`} </td>
                                            <td>  <button className="btn btn-sm btn-primary " onClick={() => EditUser(item)} >Edit</button> <button className="btn btn-sm btn-primary ">Delete</button> </td>
                                        </tr>
                                    }) : ""
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

                : <TR_modal open={openFormmodal} onClose={() => setOpenformmodal(false)}>

                    <TR_createUser setopenmodal={setOpenformmodal} userData={singleUser} />
                </TR_modal>
            }


        </div>
    )
}

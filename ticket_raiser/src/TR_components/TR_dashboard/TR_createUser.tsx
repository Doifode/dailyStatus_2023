import React, { useEffect, useState } from 'react'
import { Grid, Select, MenuItem, TextField, Typography, Button } from "@material-ui/core"
import { Formik, Form, ErrorMessage } from "formik"
import { IRegisterUser, CreateUser_val, IRegisterUser_Array, initialStateType } from '../TR_constants'
import { useDispatch, useSelector } from "react-redux"
import { edituserdata, getlocalstoragedata, saveusertolocal } from '../../TR_redux/Actions'
import { Close } from '@material-ui/icons'
type props = {
    setopenmodal?: any
    userData?: IRegisterUser | null
}

export const TR_createUser = (props: props) => {
    const { setopenmodal, userData } = props
    const dispatch = useDispatch();
    const [localData, setLocalData] = useState<IRegisterUser_Array>([])
    const state: IRegisterUser_Array = useSelector((state: initialStateType) => state?.USER_INFO)
    const [userInformation, setUserInformation] = useState<IRegisterUser[]>(state ? state : []);
    useEffect(() => {
        const getlocal: any = localStorage.getItem('userList');
        const parse = JSON.parse(getlocal);
        setLocalData(parse)
        dispatch(getlocalstoragedata())

    }, [])

    const intitalValuesr: IRegisterUser = {
        id: userData?.id ? userData.id : Date.now(),
        Fname: userData?.Fname ? userData.Fname : "",
        Lname: userData?.Lname ? userData.Lname : "",
        Mobile: userData?.Mobile ? userData.Mobile : 0,
        Username: userData?.Username ? userData.Username : "",
        Password: userData?.Password ? userData.Password : "",
        Email: userData?.Email ? userData.Email : "",
        Role: userData?.Role ? userData.Role : 100

    }
    const SubmitForm = (values: IRegisterUser, resetForm: any): void => {
        if (userData == null) {
            setUserInformation([...userInformation, values])
            console.log(values)
            localStorage.setItem("userList", JSON.stringify([...userInformation, values]))
            dispatch(saveusertolocal(userInformation))
        }

        if (userData?.id) {
            dispatch(edituserdata(values))

        }
        setopenmodal(false)
        resetForm()
        dispatch(getlocalstoragedata())

    }
    console.log('reduxstate', state)
    return (
        <div className='d-flex justify-center align-items-center'>
            <Formik initialValues={intitalValuesr} validationSchema={CreateUser_val} onSubmit={(values, { resetForm }) => { SubmitForm(values, resetForm) }}>
                {
                    ({ handleChange, handleBlur, values, resetForm }) => <Form className='container'>
                        <Close className='float-end' onClick={() => setopenmodal(false)} ></Close>

                        <TextField value={values.Fname} onChange={handleChange} onBlur={handleBlur} name="Fname" size='small' fullWidth className='my-3'
                            type="search"
                            variant="filled" placeholder='Enter First Name' label="First Name" />
                        <Typography color='error'>

                            <ErrorMessage name="Fname" />
                        </Typography>
                        <TextField value={values.Lname} onChange={handleChange} onBlur={handleBlur} size='small' fullWidth name="Lname" className='my-3'
                            type="search"
                            variant="filled" placeholder='Enter user Last Name' label="User Last Name" />
                        <Typography color='error'>

                            <ErrorMessage name="Lname" />
                        </Typography>
                        <TextField value={values.Email} onChange={handleChange} onBlur={handleBlur} size='small' fullWidth className='my-3'
                            name="Email"
                            type="search"
                            variant="filled" placeholder='Enter user Email' label="User Email" />
                        <Typography color='error'>

                            <ErrorMessage name="Email" />
                        </Typography>
                        <TextField value={values.Mobile} onChange={handleChange} onBlur={handleBlur} type="number" size='small' fullWidth className='my-3' name='Mobile'

                            variant="filled" placeholder='Enter user Mobile' label="User Mobile" />
                        <Typography color='error'>

                            <ErrorMessage name="Mobile" />
                        </Typography>

                        <TextField value={values.Username} onChange={handleChange} onBlur={handleBlur} size='small' fullWidth className='my-3'
                            name="Username"

                            type="search"
                            variant="filled" placeholder='Enter user Name' label="User Name" />
                        <Typography color='error'>

                            <ErrorMessage name="Username" />
                        </Typography>

                        <TextField value={values.Password} onChange={handleChange} onBlur={handleBlur} size='small' fullWidth className='my-3'
                            name='Password' type="search"
                            variant="filled" placeholder='Enter user Password' label="User Pasword" />
                        <Typography color='error'>

                            <Select onChange={handleChange} name="Role" fullWidth>
                                <MenuItem value={1}>
                                    Helper
                                </MenuItem>
                                <MenuItem value={2}>
                                    Worker

                                </MenuItem >

                            </Select>

                            <ErrorMessage name="Password" />
                        </Typography>
                        <Grid container className='text-center'>
                            <Button type="submit" variant='contained' color='primary' >
                                Create User
                            </Button>

                        </Grid>
                    </Form>
                }
            </Formik>



        </div>
    )
}

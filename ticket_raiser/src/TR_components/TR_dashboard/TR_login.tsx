import { Grid, TextField, Button, Typography } from '@material-ui/core'
import { Formik, Form, ErrorMessage } from 'formik'
import { UserLogin_val, IUserLogin_Int, IRegisterUser_Array, initialStateType } from '../TR_constants';
import { useNavigate, Outlet } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getlocalstoragedata } from '../../TR_redux/Actions';

export const TR_login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const state: any = useSelector((state: any) => state?.USER?.USER_INFO)
    const [roles, ceckRoles] = useState<IRegisterUser_Array | []>([])
    const intitalValues: IUserLogin_Int = {
        userName: "",
        passWord: "",
        role: 0
    }
    const LoginUser = (values: IUserLogin_Int) => {
        if (values.userName == 'yashD' && values.passWord == "yashD2304") {
            localStorage.setItem("userRole", JSON.stringify(0))
            navigate('/userdashboard')
        }
        if (roles.find((i) => i.Username === values.userName && i.Password === values.passWord)) {
            navigate('/userdashboard')
            localStorage.setItem("userRole", JSON.stringify(roles.find((i) => i.Username === values.userName && i.Password === values.passWord)))

        }

        if (values) {

        }
    }

    useEffect(() => {
        const localData: any = localStorage.getItem("userList");
        const parseData: any = JSON.parse(localData);
        ceckRoles(parseData)
        dispatch(getlocalstoragedata());


    }, [])

    return (
        <div>
            <Grid>
                <Grid container className='center_div' item>
                    <Formik initialValues={intitalValues}
                        validationSchema={UserLogin_val}
                        onSubmit={(values) => { LoginUser(values) }}>
                        {({ handleChange, handleBlur }) =>
                            <Form className="center_div column_dir m-5">
                                <TextField onChange={handleChange} onBlur={handleBlur} className='mb-3' name='userName' label="User Name" />
                                <Typography color='error'>  <ErrorMessage name="userName" /></Typography>
                                <TextField onChange={handleChange} onBlur={handleBlur} className='mb-3' name='passWord' label="Password" />
                                <Typography color='error'>  <ErrorMessage name="passWord" /></Typography>
                                <Button type="submit" variant='outlined' className='bg-primary text-white mt-3'> Login</Button>
                            </Form>
                        }
                    </Formik>
                </Grid>
                <Outlet />
            </Grid>
        </div >
    )
}

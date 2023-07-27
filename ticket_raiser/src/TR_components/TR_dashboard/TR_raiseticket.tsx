import { Button, Grid, Select, TextField, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { Formik, Form, ErrorMessage, Field } from "formik"
import { Close } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { IRegisterUser, IRegisterUser_Array, IraiseTicket, initialStateType } from '../TR_constants';
import { raiseticket } from '../../TR_redux/Actions';

export const TR_raiseticket = () => {
    const imageinput: any = useRef();
    const [helperList, setHelperList] = useState([])
    const dispatch = useDispatch();
    const state: any = useSelector((state: any) => state?.USER?.USER_INFO)
    const statess: any = useSelector((state) => state)
    const [queryImage, setQueryImage] = useState("")
    const uploadImage = (e: any) => {
        setQueryImage(URL.createObjectURL(e.target.files[0]))
    }
    useEffect(() => {
        setHelperList(state.filter((i: any) => i.Role == 1))

    }, [state])
    const initialValues: IraiseTicket = {
        description: '',
        priority: 100,
        asignto: 0,
        image: "",
        query: ""

    }
    const SubmitForm = (values: IraiseTicket) => {
        dispatch(raiseticket(values))

    }
    console.log('statess', statess)

    return (
        <div>
            <div className='container center_div' >
                <div className='ticket_raise_form' >
                    <Formik onSubmit={(values) => { SubmitForm(values) }} initialValues={initialValues}>{
                        ({ handleChange }) =>
                            <Form>
                                <div className="row">
                                    <div className="col-md-6 my-3">
                                        <label htmlFor="query">Query*</label>
                                        <Field className="form-control" variant name="query" />
                                        <Typography color='error'> <ErrorMessage name='query' /></Typography>
                                    </div>
                                    <div className="col-md-6 my-3">
                                        <label htmlFor="query">Priority *</label>
                                        <Field className="form-control" fullwidth name="priority" as="select"   >
                                            <option value="1">First</option>
                                            <option value="2">Second</option>
                                            <option value="3">Third</option>
                                        </Field>
                                        <Typography color='error'> <ErrorMessage name='priority' /></Typography>
                                    </div>
                                    <div className="col-md-12 my-3">
                                        <label htmlFor="query">Asign To*</label>
                                        <Field className="form-control" fullwidth name="asignto" as="select"   >
                                            {
                                                helperList.map((i: IRegisterUser) => {
                                                    return <option value={i.id} >{`${i.Fname} ${i.Lname}`}</option>
                                                })
                                            }

                                        </Field>
                                        <Typography color='error'> <ErrorMessage name='priority' /></Typography>
                                    </div>

                                    <div className="col-md-12  my-3 ">
                                        <label htmlFor="query">Description*</label>

                                        <Field className="form-control" variant name="description" as="textarea" />
                                        <Typography color='error'> <ErrorMessage name='description' /></Typography>

                                    </div>
                                    <div className="col-md-12 my-3 ">
                                        <label htmlFor="query">Image*</label>
                                        {queryImage ? <div className='center_div align-items-start'> <img width={100} height={100} className='round' src={queryImage} alt="" /><Close onClick={() => setQueryImage("")} /></div> : <div className="dropzone center_div border">
                                            <div className='center_div '><input accept=".jpg, .png, .jpeg" onChange={(e) => uploadImage(e)} name='image' type="file" ref={imageinput} className='d-none' />
                                                <div onClick={() => imageinput?.current.click()} className='btn btn-dark btn-sm'>Upload</div></div>
                                        </div>}
                                    </div>
                                    <div className="row my-3 ">
                                        <div className="col-md-6 center_div"><Button variant='contained' color='primary' type='submit'>Submit</Button>
                                        </div>
                                        <div className="col-md-6 center_div"> <Button variant='contained' color='primary'>Clear</Button></div>
                                    </div>
                                </div>

                            </Form>
                    }

                    </Formik></div>


            </div>
        </div>
    )
}

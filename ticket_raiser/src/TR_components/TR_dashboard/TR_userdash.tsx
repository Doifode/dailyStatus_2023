import { useEffect, useState } from 'react'
import { AppBar, Container, Grid, Button, Box, Drawer, IconButton } from "@material-ui/core"
import { Close, Menu } from '@material-ui/icons';
import { TR_modal } from '../TR_reusable/TR_modal';
import { TR_createUser } from './TR_createUser';
import { useNavigate, Outlet, NavLink } from "react-router-dom"
import { TR_table } from '../TR_reusable/TR_table';
import { useDispatch, useSelector } from 'react-redux';
import { IRegisterUser, initialStateType } from '../TR_constants';
import { getlocalstoragedata } from '../../TR_redux/Actions';

export const TR_userdash = () => {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [openDrawer, setOpendrawer] = useState<boolean>(false);
  const [opoenModal, setOpenModal] = useState<boolean>(false);
  const state: any = useSelector((state: initialStateType) => state.USER_INFO)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole) {
      setUserRole(userRole)
    }
    console.log("userRole", typeof (userRole))
    dispatch(getlocalstoragedata())

  }, [])
  return (
    <div>
      <AppBar>
        <div className="row my-3">
          <div className="col-md-12">
            <Button className='float-end' onClick={() => setOpendrawer(true)}><Menu /></Button>
          </div>
        </div>
      </AppBar>

      <Drawer
        anchor='right'
        open={openDrawer}
        onClose={() => setOpendrawer(false)}

      >
        <div className="row">
          <div className="col-9"></div>
          <div className="col-3"><IconButton onClick={() => setOpendrawer(false)}><Close></Close></IconButton></div>
        </div>
        <Box className='px-5'>
          <Box textAlign="center" component="div">
            {userRole === "0" ? <Button onClick={() => setOpenModal(true)} >Create User</Button> : ""}
          </Box>
          <Box textAlign="center" component="div">
            {userRole === "0" ? <Button   > <NavLink to="/userdashboard/userTable">Show Users</NavLink></Button> : ""}
          </Box>
          <Box textAlign="center" component="div">
            {userRole === "1" ? <Button>See Tickets</Button> : ""}
          </Box>
          <Box textAlign="center" component="div">
            {userRole === "2" ? <Button onClick={() => navigate('/userdashboard/raiseTicket')}>Raise Ticket</Button> : ""}
          </Box>
          <Box textAlign="center" component="div">
            <Button onClick={() => { navigate("/"); localStorage.removeItem("userRole") }}>Log Out</Button>
          </Box>
        </Box>
      </Drawer>
      <TR_modal open={opoenModal} onClose={() => setOpenModal(false)}>
        <TR_createUser setopenmodal={setOpenModal} />

      </TR_modal>

      <div className='mt-5 pt-5'>
        <Outlet />
      </div>

    </div >
  )
}

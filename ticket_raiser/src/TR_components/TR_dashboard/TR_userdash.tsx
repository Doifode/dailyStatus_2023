import { useEffect, useState } from 'react'
import { AppBar, Typography, Button, Box, Drawer, IconButton } from "@material-ui/core"
import { Close, Menu } from '@material-ui/icons';
import { TR_modal } from '../TR_reusable/TR_modal';
import { TR_createUser } from './TR_createUser';
import { useNavigate, Outlet, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { IRegisterUser, initialStateType } from '../TR_constants';
import { getlocalstoragedata } from '../../TR_redux/Actions';
import { ImUser } from "react-icons/im";
export const TR_userdash = () => {
  const [userRole, setUserRole] = useState<IRegisterUser>({
    id: 10,
    Fname: "",
    Password: "",
    Mobile: 10,
    Lname: "",
    Email: "",
    Username: "",
    Role: 10
  })
  const [openDrawer, setOpendrawer] = useState<boolean>(false);
  const [opoenModal, setOpenModal] = useState<boolean>(false);
  const state: any = useSelector((state: initialStateType) => state.USER_INFO)
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { Role, Username, Fname, Lname, Password, } = userRole

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (userRole) {
      setUserRole(JSON.parse(userRole))
    }
    console.log("userRole", userRole)
    dispatch(getlocalstoragedata())

  }, [])

  return (
    <div>
      <AppBar>
        <div className=" my-3 d-flex justify-content-between align-items-center">
          <div className='d-flex justify-content-center align-items-center flex-column'> <ImUser fontSize={35} /> <Typography variant="h6" className='px-3'>{`${Fname} ${Lname}`}</Typography></div>
          <Button className='float-end' onClick={() => setOpendrawer(true)}><Menu /></Button>
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
            <Button>Profile</Button>
          </Box>
          <Box textAlign="center" component="div">
            {Role === 0 ? <Button onClick={() => setOpenModal(true)} >Create User</Button> : ""}
          </Box>
          <Box textAlign="center" component="div">
            {Role === 0 ? <Button >  Show Users </Button> : ""}
          </Box>
          <Box textAlign="center" component="div">
            {Role === 1 ? <Button>See Tickets</Button> : ""}
          </Box>
          <Box textAlign="center" component="div">
            <Button onClick={() => navigate('/userdashboard/raiseTicket')}>Raise Ticket</Button>
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

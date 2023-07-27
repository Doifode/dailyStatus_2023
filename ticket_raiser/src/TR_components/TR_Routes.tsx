import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TR_login } from './TR_dashboard/TR_login'
import { TR_userdash } from './TR_dashboard/TR_userdash'
import { TR_createUser } from './TR_dashboard/TR_createUser'
import { TR_raiseticket } from './TR_dashboard/TR_raiseticket'
import { TR_table } from './TR_reusable/TR_table'

export const TR_routes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TR_login />} />
          <Route path='/userdashboard' element={<TR_userdash />}>
            <Route path='/userdashboard/createUserform' element={<TR_createUser />} />
            <Route path='/userdashboard/raiseTicket' element={<TR_raiseticket />} />
            <Route path='/userdashboard/userTable' element={<TR_table />} />
            <Route />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

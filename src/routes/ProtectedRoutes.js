import {Outlet} from 'react-router'

import React, {useContext} from 'react'
import AuthContext from '../contexts/AuthContext'
import Home from '../pages/Home';

export default function ProtectedRoutes() {
  const {authContext} = useContext(AuthContext);
  return authContext ? <Outlet/> : <Home/>
}
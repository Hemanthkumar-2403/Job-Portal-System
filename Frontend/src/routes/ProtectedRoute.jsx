import React from 'react'

import { Navigate , Outlet ,useLocation } from 'react-router-dom';

const ProtectedRoute =({})=>{
  return<Outlet/>
}

export default ProtectedRoute;
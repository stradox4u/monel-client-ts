import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className='container mx-auto max-w-6/12 p-6 mt-12 rounded-md shadow-md shadow-monel-green'>
      <h2 className='font-texturina text-3xl text-center'>Login/Signup</h2>
      <Outlet />
    </div>
  )
}

export default AuthLayout
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const AppLayout: React.FC = () => {
  return (
    <div className="container mx-auto p-12">
      <div className='grid grid-cols-5 gap-4'>
        <div className='col-span-1'>
          <SideBar />
        </div>
        <div className='col-span-4'>
          <NavBar />
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default AppLayout
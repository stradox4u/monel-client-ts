import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

const AppLayout: React.FC = () => {
  return (
    <div className="container mx-auto sm:p-12">
      <div className='grid sm:grid-cols-5 sm:gap-4 grid-cols-1 grid-rows-auto'>
        <div className='col-span-1 order-2 sm:order-1 sm:row-span-3'>
          <SideBar />
        </div>
        <div className='sm:col-span-4 col-span-1 order-1 sm:order-2 sm:row-span-1 h-fit'>
          <NavBar />
        </div>
        <div className='sm:col-span-4 col-span-1 order-3 sm:order-3 sm:row-span-2 items-stretch'>
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default AppLayout
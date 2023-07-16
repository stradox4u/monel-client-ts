import React, { useState } from "react";
import { Link } from "react-router-dom";

import { getCurrentUser, store, useLogoutUserMutation } from "../../store";
import SearchBar from "./SearchBar";

const NavBar: React.FC = () => {
  
  const userObject = getCurrentUser(store.getState());
  
  const [showLogout, setShowLogout] = useState(false);
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  }

  const [logoutUser] = useLogoutUserMutation();
 
  const runLogout = () => {
    logoutUser();
  }



  return (
    <nav className="grid grid-cols-5 items-center justify-items-start">
      <Link to="/" className="col-span-1"><p className="sm:text-3xl text-base font-texturina text-monel-blue">MONEL</p></Link>
      <div className="col-span-3 sm:w-full justify-self-stretch shrink sm:h-12 h-8">
        <SearchBar />
      </div>
      <div onClick={toggleLogout} className="col-span-1 justify-self-end cursor-pointer relative">
        <img src={userObject?.avatar} alt="user profile" className="rounded-full w-12 h-12 object-cover" />
        {showLogout ? (
          <div onClick={runLogout} className="absolute top-[100%] right-[100%] bg-monel-blue py-3 px-4 rounded-md shadow-md transform hover:scale-110">
            <span className="font-texturina text-lg text-monel-gray">Logout</span>
          </div>
        ) : (
          null
        )}
      </div>
    </nav>
  )
}

export default NavBar;
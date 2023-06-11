import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../util/queries";
import axios from "../util/axios";
import { AxiosError } from "axios";

const NavBar: React.FC = () => {
  const { data: userObject } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
  });

  const [showLogout, setShowLogout] = useState(false);
  const toggleLogout = () => {
    setShowLogout(!showLogout);
  }

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const runLogout = async () => {
    try {
      const response = await axios.post("/auth/logout");
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        navigate("/");
      }
    } catch (err: AxiosError | unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data.message);
      }
    }
  }



  return (
    <nav className="flex flex-row gap-8 justify-between align-baseline">
      <Link to="/" className="grow-0"><p className="text-3xl font-texturina text-monel-blue">MONEL Ventures</p></Link>
      <div className="grow">
        {/* <SearchBar /> */}
      </div>
      <div onClick={toggleLogout} className="flex flex-row justify-end align-middle grow-0 cursor-pointer relative">
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
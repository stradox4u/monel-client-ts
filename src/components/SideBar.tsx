import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Hamburger from "./Hamburger";
import { getCurrentUser, store } from "../../store";


const SideBar: React.FC = () => {
  const userObject = getCurrentUser(store.getState());
  const sidebarItems = [
    { label: "Home", icon: "fas fa-home", link: "/", permission: "user" },
    { label: "Purchases", icon: "fas fa-credit-card", link: "/purchases", permission: "admin" },
    { label: "Sales", icon: "fa fa-users", link: `/user/${userObject?._id}/sales`, permission: "user" },
    { label: "View Stock", icon: "fas fa-archive", link: "/stock", permission: "admin" },
    { label: "Add New Product", icon: "fas fa-file-medical", link: "/product/create", permission: "admin" },
    { label: "Account Statement", icon: "fas fa-chart-line", link: "/statement", permission: "admin" },
  ]
  let userRole: string[];
  if (userObject?.role === "admin" || userObject?.role === "super user") {
    userRole = ["admin", "user"]
  } else {
    userRole = ["user"]
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  }

  const sidebarEntries = sidebarItems.map((el, index) => {
    return (
      userRole.includes(el.permission) ? (
        <NavLink to={el.link} key={index}
          className={({isActive}) => (isActive ? "bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-md " : "") + "group inline-flex gap-4 items-baseline hover:text-slate-50 cursor-pointer p-4 w-full"}>
        <i className={el.icon}></i>
        <p className="block group-hover:font-semibold sm:text-md align-baseline font-montserrat truncate">
          {el.label}
        </p>
      </NavLink>
      ) : null
    )
  })

  const mobileMenu = (
    menuOpen ? (
      <ul className="list-style-none sm:flex flex-col gap-2">
        {sidebarEntries}
      </ul>
    ) : ""
  )

  return (
    <div className="w-full h-full sm:rounded-l-md sm:py-12 py-4 px-6 bg-monel-green relative">
      <div onClick={toggleMenuOpen} className="sm:hidden">
        <Hamburger menuOpen={menuOpen} />
        {mobileMenu}
      </div>
      <ul className="list-style-none sm:flex flex-col sm:gap-12 gap-2 hidden">
        {sidebarEntries}
      </ul>
    </div >
  )
}

export default SideBar;
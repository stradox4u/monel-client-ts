import React from "react";
import { NavLink } from "react-router-dom";
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

  const sidebarEntries = sidebarItems.map((el, index) => {
    return (
      userRole.includes(el.permission) ? (
        <NavLink to={el.link} key={index}
          className={({isActive}) => (isActive ? "bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-md " : "") + "group inline-flex gap-4 items-baseline hover:text-slate-50 cursor-pointer p-4"}>
        <i className={el.icon}></i>
        <p className="block group-hover:font-semibold text-md align-baseline font-montserrat truncate">
          {el.label}
        </p>
      </NavLink>
      ) : null
    )
  })
  return (
    <div className="w-full h-full rounded-l-md py-12 px-6 bg-monel-green">
      <ul className="list-style-none flex flex-col gap-12">
        {sidebarEntries}
      </ul>
    </div>
  )
}

export default SideBar;
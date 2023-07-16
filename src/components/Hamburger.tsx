import React from "react";

type HamburgerProps = {
  menuOpen: boolean;
}

const Hamburger: React.FC<HamburgerProps> = ({ menuOpen }) => {
  return (
    <>
      <div className="absolute top-1 left-1 cursor-pointer h-6 py-3 aspect-square">
        <span aria-hidden="true"
            className={(menuOpen ? "rotate-45" : "-translate-y-1.5") + 
            " block absolute h-0.5 w-4 bg-current transform transition duration-500 ease-in-out"}>
        </span>
        <span aria-hidden="true"
            className={(menuOpen ? "opacity-0" : "") +
              " block absolute  h-0.5 w-4 bg-current transform transition duration-500 ease-in-out"} >
        </span>
        <span aria-hidden="true"
            className={(menuOpen ? "-rotate-45" : "translate-y-1.5") + 
            " block absolute  h-0.5 w-4 bg-current transform transition duration-500 ease-in-out"}>
        </span>
      </div>
    </>
  )
}

export default Hamburger;
import React from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";


const Navbar = ({ setIsOpen, auth }) => {
  return (
    <div className="w-full flex p-3 justify-between	border border-b-1 border-gray-700 md:border-0">
      <div className="text-white md:hidden" onClick={() => setIsOpen(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 8C3 7.44772 3.44772 7 4 7H20C20.5523 7 21 7.44772 21 8C21 8.55228 20.5523 9 20 9H4C3.44772 9 3 8.55228 3 8ZM3 16C3 15.4477 3.44772 15 4 15H14C14.5523 15 15 15.4477 15 16C15 16.5523 14.5523 17 14 17H4C3.44772 17 3 16.5523 3 16Z" fill="currentColor"></path></svg>
      </div>
      <div className="text-white	text-lg			">ChatGPT <span className="text-gray-300">3.5</span></div>
      {!auth ? <Link to={'/join'}><button className="text-white bg-[rgba(16,163,127)] md:hidden  rounded-md py-1 px-2 pointer hover:bg-[rgba(16,163,127,0.3)]">Sign up</button></Link>
        : <div></div>}
    </div>
  );
};

export default Navbar;

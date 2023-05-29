import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

//Navbar superiore della pagina

const Navbar = () => {
  const { user, logOut } = UserAuth();
 
  //console.log(user)


  if (user?.email) {
    return (
      <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
        <Link to="/">
          <h1 className="text-red-600  text-4xl font-bold cursor-pointer">
            NETFLIX
          </h1>
        </Link>
        <div>
          <Link to="/account">
            <button className="text-white cursor-pointer pr-4">Account</button>
          </Link>
          <Link to="/">
            <button
              className="bg-red-600 cursor-pointer px-6 py-2 rounded text-white "
              onClick={() => logOut()}
            >
              Log out
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-between p-4 z-[100] w-full absolute">
        <Link to="/">
          <h1 className="text-red-600  text-4xl font-bold cursor-pointer">
            NETFLIX
          </h1>
        </Link>
        <div>
          <Link to="/login">
            <button className="text-white cursor-pointer pr-4">Sing In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 cursor-pointer px-6 py-2 rounded text-white ">
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    );
  }
};

export default Navbar;

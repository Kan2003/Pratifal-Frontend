import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import SignupButton from "./SignupButton";

const Navbar = () => {
  return (
    <div className="w-full fixed bg-slate-50   flex items-center justify-between h-[70px] px-4">
      <div>
        <div className="flex gap-1 items-center justify-center">
            <img className="w-[50px] h-[50px]" src={logo} alt="" />

          <h1 className="text-black text-2xl font-press-start">PratiFal</h1>
        </div>
      </div>
      <div className="flex gap-5">
        <SignupButton text="Sign Up for free" color='bg-purple-600'/>
        <Link
          className="bg-purple-700 py-2 px-5 rounded-3xl text-[12px] font-press-start"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

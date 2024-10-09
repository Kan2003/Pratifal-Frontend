import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
import SignupButton from "./littleComponents/SignupButton";

const Navbar = () => {
  return (
    <div className="w-full fixed shadow-lg bg-slate-50   flex items-center z-[100] justify-between h-[60px] px-4 ">
      <div>
        <div className="flex gap-1 items-center justify-center">
            <img className="w-[50px] h-[50px]" src={logo} alt="" />

          <h1 className="text-black text-2xl font-headlandOne">PratiFal</h1>
        </div>
      </div>
      <div className="flex gap-5">
        <SignupButton text="Sign Up for free" color='bg-zinc-900' textColor='text-white' />
        <Link
          className="bg-zinc-400 py-2 px-5 rounded-3xl tracking-wide text-[12px] font-headlandOne"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

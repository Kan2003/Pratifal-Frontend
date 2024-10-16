import React from "react";
import { Link } from "react-router-dom";

const SignupButton = ({text , color , textColor}) => {
  return (
    <Link
      className={`${color} py-2 px-7 rounded-3xl text-[12px] flex items-center tracking-wider justify-center ${textColor} font-headlandOne transition-all duration-500 ease-in-out  hover:bg-[#58B9ED] hover:text-black`}
      to="/register"
    >
      {text}
    </Link>
  );
};

export default SignupButton;

import React from "react";
import { Link } from "react-router-dom";

const SignupButton = ({text , color , textColor}) => {
  return (
    <Link
      className={`${color} py-2 px-5 rounded-3xl text-[12px] flex items-center justify-center text-${textColor} font-press-start`}
      to="/ragister"
    >
      {text}
    </Link>
  );
};

export default SignupButton;

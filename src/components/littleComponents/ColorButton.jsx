import React from "react";

const ColorButton = ({ color, text }) => {
  return <div className={`inline-block text-[25px] tracking-[-2%]  font-bold px-4 py-[8px] rounded-full ${color} font-Harmattan`}>{text}</div>;
};

export default ColorButton;

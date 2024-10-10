import React, { useState } from "react";
import del from "../../assets/delete.svg";
import star from "../../assets/Lightning.svg";
import edit from "../../assets/edit.svg";
import copy from "../../assets/copy.svg";
import Success from "./Success";
import Error from "./Error";

const Card = () => {


    // const [couponcopy , setCopy] = useState(false);
    const coupon = "XX783872PSQEE"
    const handleClipboard = async () => {
        try {
          await navigator.clipboard.writeText(coupon);
          console.log(coupon)
        //   setCopy(true);
        //   setTimeout(() => {
        //     setCopy(false);
        //   }, 2000);
        } catch (err) {
            // setCopy('Failed to copy text');
            console.log(err)
        }
      };


  return (
    
    <div className="w-[300px] h-[190px] rounded-2xl bg-[#D9D9D9] flex flex-col justify-between px-[10px] py-[8px] border-[1px] bg-bottom bg-cover border-zinc-500 shadow-lg  object-cover ">
       
      <div className="w-full flex items-center justify-end gap-2">
        <img className="w-[20px] cursor-pointer" src={edit} alt="" />
        <img className="w-[25px] cursor-pointer" src={del} alt="" />
        <img className="w-[17px] cursor-pointer text-white" src={star} alt="" />
      </div>
      <div className="pl-[1vw] w-full font-hanken-grotesk italic font-normal tracking-[2%]">
        <h3 className="company leading-tight">Myntra.com</h3>
        <div className="flex leading-tight items-center gap-2">
          <h2 className="coupon">{coupon}</h2>
          <img
            onClick={handleClipboard}
            className="w-[17px] cursor-pointer text-white"
            src={copy}
            alt=""
          />
        </div>
        <h4 className="leading-tight">10/10/2024</h4>
        <p className="tracking-tighter leading-none text-[11px]">This coupon will be redeemed for Rs. 150 off your next purchase.</p>
      </div>
    </div>
  );
};

export default Card;

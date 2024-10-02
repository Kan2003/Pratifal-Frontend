import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Lenis from "lenis";
import SignupButton from "./SignupButton";
import { useNavigate } from "react-router-dom";

const Page = () => {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {});

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  // const navigate = useNavigate();
  // const isLoggedIn = Boolean(localStorage.getItem("isAuthenticated")); // Replace with your authentication logic
  // console.log(isLoggedIn)
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/dashboard');
  //   }
  // }, [isLoggedIn, navigate]);
  
  return (
    <div className="w-full  bg-slate-50 ">
      <Navbar />
      <div className="w-full h-[150vh] pt-[10vw] bg-[url('https://cdn.prod.website-files.com/66a9edf7bd0139f5207e19be/66db31dbefabba2ccab38c8b_hero-2%202.avif')]">
        <div className="flex items-center justify-center flex-col gap-5 py-14">
          <h1 className=" text-3xl font-press-start ">
            Store Your All Rewards in A single & Secured Place
          </h1>
          <p className="text-sm font-press-start font-bold  ">
            All Your Rewards, Safely Stored, Notified, and Starred for Easy
            Access.
          </p>
          <SignupButton
            text="Get Started For Free"
            color="bg-black"
            textColor="white"
          />
          <p className="text-[10px] -mt-2 font-press-start">
            Save Unlimited rewards | No Payment needed
          </p>
          <div className="bg-white  w-[97%] h-[80vh] rounded-2xl"></div>
        </div>

        
      </div>
    </div>
  );
};

export default Page;

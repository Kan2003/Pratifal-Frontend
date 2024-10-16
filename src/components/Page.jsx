import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Lenis from "lenis";
import SignupButton from "./littleComponents/SignupButton";
import speaker from "../assets/66f2e8b62f0f951eb6f22fb9_Frame.png";
import background from "../assets/background.png";
import video from "../assets/Untitled Video.mp4";
import ColorButton from "./littleComponents/ColorButton";
import axios from "axios";
import HorizontalScroll from "./littleComponents/HorizontalScroll";
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

  const [user, setUser] = useState(false);
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const userDetails = async () => {
      try {
        const response = await axios.get("/api/v2/users/");
        if (response.status === 200) {
          setUser(true);
          setProfile(response.data.data.profile);
        }
      } catch (error) {
        // console.log(error.status)
        if (error.status === 401) {
          try {
            const response = await axios.post(
              "/api/v2/users/refresh-accesstoken"
            );
            console.log(response.data);
            setUser(true);
          } catch (error) {
            console.log(error);
            setUser(false);
          }
        }
      }
    };
    userDetails();
  }, []);
  return (
    // style={{ backgroundImage: `url(${background})` }} background image style
    <div className="w-full bg-no-repeat " >
      
      <Navbar user={user} profile={profile} />
      <div className="w-full relative pt-[7vw] ">
        <div className="flex px-[2vw] items-center justify-center flex-col gap-5 py-14">
          <h1 className=" text-[40px] font-headlandOne ">
            Store Your All Rewards in A single & Secured Place
          </h1>
          <p className="text-sm font-headlandOne font-medium  ">
            All Your Rewards, Safely Stored, Notified, and Starred for Easy
            Access.
          </p>
          <SignupButton
            text="Get Started For Free"
            color="bg-black"
            textColor="text-white"
          />
          <p className="text-[12px] -mt-2 font-headlandOne">
            Save Unlimited rewards | No Payment needed
          </p>
        </div>
        {/* video */}
        <div className="px-[2vw]">
          <div className="bg-white w-full h-[100vh] rounded-2xl overflow-hidden relative border-[2px] border-zinc-400">
            <div className="w-[90px] h-[90px] bg-[#ffffff1a]  top-[25px] left-[25px] absolute rounded-[20%] flex items-center justify-center ">
              <div className="w-[60px] h-[60px] bg-[#D9D9D9] rounded-[20%] flex items-center justify-center">
                <img
                  className="w-[29.5px] h-[29.5px] cursor-pointer stroke-black z-20"
                  src={speaker}
                  alt=""
                />
              </div>
            </div>
            <video
              autoPlay
              playsInline
              muted
              loop
              src={video}
              className="w-full h-full object-cover"
            ></video>
          </div>
        </div>
        {/* third section */}
        <div className=" my-[4vw] w-full  flex items-center px-[6vw] justify-between">
          <div className="w-[40vw]  h-full py-[8vw] flex flex-col items-start gap-6">
            <div className="heading flex flex-col items-start w-full font-headlandOne">
              <h1 className="text-[20px] tracking-wider leading-[250%]">
                <span className="text-[60px]">S</span>ecure.
              </h1>
              <h1 className="text-[20px] tracking-wider leading-[250%]">
                <span className="text-[60px]">C</span>entralized.
              </h1>
              <h1 className="text-[20px] tracking-wider leading-[250%]">
                <span className="text-[60px]">A</span>ccessible.
              </h1>
            </div>
            <div className="w-[80%]">
              <p className="text-[20px] font-hanken-grotesk font-medium tracking-normal leading-6">
                {/* Say goodbye to missed rewards, forgotten coupons, and expired points with our website! It’s designed to store all your rewards and coupons in one secure, easy-to-access location. No more sifting through different platforms or losing track of valuable deals. Our website lets you effortlessly manage your rewards, ensuring they are available at your fingertips whenever you shop. Whether you’re online or in-store, enjoy the convenience of having all your savings in one place—making your shopping experience smoother, more organized, and cost-effective. Access your rewards anytime, from anywhere! */}
                Never miss out on rewards, coupons, or points again! Store
                everything in one secure place and access them effortlessly
                whenever you shop.Our website lets you effortlessly manage your
                rewards, ensuring they are available at your fingertips whenever
                you shop, making saving money simpler and more convenient. Stay
                organized and never let another reward expire—your savings are
                just a click away!
              </p>
            </div>
            <SignupButton
              text="Sign Up for free"
              color="bg-zinc-900"
              textColor="text-white"
            />
          </div>
          <div className="w-[40vw] bg-zinc-200 rounded-2xl h-[555px]"></div>
        </div>
        {/* forth section */}
        <div className="my-[4vw] px-[2vw] w-full flex flex-col items-center gap-6">
          <h1 className="text-center text-[59px] tracking-normal font-headlandOne">
            "Don't let your{" "}
            <div className="inline-flex">
              <span className="-translate-y-3">
                <ColorButton color="bg-[#002fec96]" text="REWARDS 🎉" />
              </span>
            </div>{" "}
            slip through the cracks. Our app Gather all your rewards in one{" "}
            <div className="inline-flex">
              <span className="-translate-y-3">
                <ColorButton color="bg-[#49ACB4]" text="SECURE 🔒" />
              </span>
            </div>{" "}
            , fortress-like vault. Experience the exhilarating{" "}
            <div className="inline-flex">
              <span className="-translate-y-3">
                <ColorButton color="bg-[#FD6BFF]" text="FREEDOM 🎉" />
              </span>
            </div>{" "}
            of having your rewards at your beck and call, ready to elevate your
            everyday{" "}
            <div className="inline-flex">
              <span className="-translate-y-3">
                <ColorButton color="bg-[#FF7669]" text="LIFE ❤️" />
              </span>
            </div>{" "}
            ."
          </h1>
          <div>
            <SignupButton
              text="Get started"
              color="bg-zinc-900"
              textColor="text-white"
            />
          </div>
        </div>

        <div className="my-[8vw] w-full">
          <HorizontalScroll />
        </div>

        <div className="w-full h-screen  "></div>
      </div>
    </div>
  );
};

export default Page;

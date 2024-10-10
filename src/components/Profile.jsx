import React, { useContext } from "react";
import { UserContext } from "../App";
import image from "../assets/Frame 322.png";
import profileImage from "../assets/Group 1000005837.svg";

import IconButton from "./littleComponents/IconButton";
const Profile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full  pt-[5vw] relative">
      <img className="w-full " src={image} alt="" />
      <div className="w-full flex px-[10vw] items-center  justify-between">
        <div className="w-full flex items-center  gap-4">
          <div className="w-[120px] h-[120px]  border-[6px] border-opacity-[50%] overflow-hidden rounded-full border-[#58B9ED]">
            {user?.profile?.length > 4 ? (
              <img
                className="w-full h-full object-cover"
                src={user?.profile}
                alt="User"
              />
            ) : (
              <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                <img
                  src={profileImage}
                  className="w-[50px] h-[50px] object-cover rounded-lg"
                  alt="Default Profile"
                />
              </div>
            )}
          </div>
          <div className="userInfo flex flex-col gap-1">
            <div className="flex items-center  gap-2">
              {/* <img className="w-[20px] h-[20px]" src={userLogo} alt="" /> */}
              <h1 className="font-hanken-grotesk text-[15px] text-[#58B9ED] font-semibold">
                Fullname :{" "}
              </h1>
              <h1 className="font-headlandOne text-[15px]">{user.fullname}</h1>
            </div>
            <div className="flex items-center  gap-2">
              <h1 className="font-hanken-grotesk text-[15px] text-[#58B9ED] font-semibold">
                Username :{" "}
              </h1>
              <h1 className="font-headlandOne text-[15px]">{user.username}</h1>
            </div>
            <div className="flex items-center  gap-2">
              <h1 className="font-hanken-grotesk text-[15px] text-[#58B9ED] font-semibold">
                Email :{" "}
              </h1>
              <h1 className="font-headlandOne text-[15px]">{user.email}</h1>
            </div>
          </div>
        </div>
        <div className="w-[30%]">
        <IconButton text="Update profile Image" />
        
        </div>
      </div>
    </div>
  );
};

export default Profile;

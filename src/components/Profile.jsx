import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import image from "../assets/Frame 322.png";
import profileImage from "../assets/Group 1000005837.svg";

import IconButton from "./littleComponents/IconButton";
import Input from "./littleComponents/Input";
import Error from "./littleComponents/Error";
import Success from "./littleComponents/Success";
import axios from "axios";
import EditProfile from "./littleComponents/EditProfile";
const Profile = () => {
  const { user } = useContext(UserContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [editProfile, setEditProfile] = useState(false);
  return (
    <div className="w-full  pt-[5vw] ">
      <img className="w-full relative" src={image} alt="" />
      {error && <Error error={error} />}
      {success && <Success success={success} />}

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


      <div className="details w-full px-[10vw] flex gap-[10vw] pt-[4vw]   h-[50vh]">
        <div className="flex flex-col gap-4">
          <div
            onClick={() => setEditProfile(!editProfile)}
            className={`w-[13vw] ${
              editProfile ? "bg-[#58B9ED]" : "bg-slate-100"
            }  px-2 py-3 text-center rounded-lg cursor-pointer  transition-all duration-500 ease-in-out`}
          >
            <h4>Edit Profile Details</h4>
          </div>
          <div className="w-[13vw] px-2 py-3 text-center rounded-lg bg-slate-100 cursor-pointer hover:bg-[#58B9ED] hover:text-black transition-all duration-500 ease-in-out">
            <h4>Change Theme</h4>
          </div>
        </div>
        {editProfile && (<EditProfile setError={setError} setSuccess={setSuccess}/>)}
      </div>
    </div>
  );
};

export default Profile;

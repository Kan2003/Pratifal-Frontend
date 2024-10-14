import React, { useState, memo, useEffect } from "react";
import logo from "../assets/logo.png";
import search from "../assets/Search.svg";
import IconButton from "./littleComponents/IconButton";
import profileImage from "../assets/Group 1000005837.svg";
import { Link, useLocation } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";

const DashBoardNavbar = memo(({ user, userImage , handleLogout , setSearch}) => {
  const location = useLocation();
  // console.log(location);
  const [drop, setDrop] = useState(false);
  const handleDropDown = () => {
    setDrop((prev) => !prev);
  };

  const items = [
    {
      label: (
        <Link onClick={handleDropDown} to="/profile">
          View Profile
        </Link>
      ),
      key: "0",
    },
    {
      label: <a href="">Change Password</a>,
      key: "2",
    },
    {
      label: <a href="https://www.aliyun.com">Settings</a>,
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: (
        <h1 onClick={handleLogout}>LogOut</h1>
      ),
      
      key: "4",
    },
  ];


  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  

  // Use a stable function reference for handleDropDown

  return (
    <div className="w-full fixed shadow-lg bg-slate-50 flex items-center z-[100] justify-between h-[60px] px-4 ">
      {/* Logo */}
      <div className="flex gap-1 items-center justify-center">
        <img className="w-[50px] h-[50px]" src={logo} alt="Logo" />
        <h1 className="text-black text-2xl font-headlandOne">PratiFal</h1>
      </div>

      {/* Search */}
      {location.pathname === "/dashboard" && (
        <div className="group input w-[25vw] shadow mb-1 border rounded py-2 px-3 text-sm text-black focus-within:border-[#58B9ED] hover:border-[#58B9ED] flex items-center justify-between">
          <input
            className="outline-none w-[80%]"
            placeholder="Search your reward"
            onChange={handleSearch}
          />
          <img
            className="w-[15px] h-[15px] opacity-[50%]"
            src={search}
            alt="Search Icon"
          />
        </div>
      )}

      {/* Right Part */}
      <div className="flex items-center gap-4 font-hanken-grotesk">
        {location.pathname === "/dashboard" && <IconButton text="create" />}
        <div className="flex gap-4 border-[1px] stroke-[0.83] stroke-[#E8EFF]  items-center justify-between px-3  py-[7px] rounded-lg">
          <div className="flex gap-1 items-center">
            <Link
              to="/dashboard"
              className="bg-[#F1F3F7] w-[40px] h-[40px] border-[1px] border-zinc-600 rounded-lg cursor-pointer flex items-center justify-center overflow-hidden"
            >
              {userImage?.length > 4 ? (
                <img
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-500 ease-in"
                  src={userImage}
                  alt="User"
                />
              ) : (
                <img
                  src={profileImage}
                  className="w-[17px] h-[18px] object-cover"
                  alt="Default Profile"
                />
              )}
            </Link>
            <div>
              <p className="text-[10px]">Welcome Back,</p>
              <p className="text-[16px] capitalize">{user?.username}</p>
            </div>
          </div>

          <Dropdown
            onClick={handleDropDown}
            className="flex cursor-pointer"
            menu={{ items }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <DownOutlined
                className={`transition-all duration-200 ease-in ${
                  drop ? "rotate-180" : ""
                }`}
              />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
});

export default DashBoardNavbar;

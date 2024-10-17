import React, { useState, memo, useEffect } from "react";
import logo from "../assets/logo.png";
import search from "../assets/Search.svg";
import IconButton from "./littleComponents/IconButton";
import profileImage from "../assets/Group 1000005837.svg";
import { Link, useLocation } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import logout from '../assets/logout-svgrepo-com.svg'

const DashBoardNavbar = memo(
  ({ user, userImage, handleLogout, setSearch, setShowCreateForm }) => {
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
        label: (
          <Link onClick={handleDropDown} to="/updatePassword">
            Update Password
          </Link>
        ),
        key: "1",
      },
      {
        label: <a href="https://www.aliyun.com">Settings</a>,
        key: "2",
      },
      {
        type: "divider",
      },
      {
        label: <div className="flex items-center justify-center gap-2" onClick={handleLogout}>
          <h1 >LogOut</h1>
          <img className="w-[25px] scale-110  h-[25px]  leading-none" src={logout} alt="" />
        </div>,

        key: "3",
      },
    ];

    const handleSearch = (e) => {
      setSearch(e.target.value);
    };

    // create reward  component

    const openRewardForm = () => {
      // Add your code to open the reward form
      setShowCreateForm(true);
    };

    // Use a stable function reference for handleDropDown

    return (
      <div className="w-full fixed shadow-lg bg-slate-50 flex items-center z-[100] justify-between h-[60px] px-4 ">
        {/* Logo */}
        <Link to="/dashboard">
          <div className="flex gap-1 items-center justify-center">
            <img className="w-[50px] h-[50px]" src={logo} alt="Logo" />
            <h1 className="text-black text-2xl font-headlandOne">PratiFal</h1>
          </div>
        </Link>

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
          {location.pathname === "/dashboard" && (
            <IconButton text="create" openRewardForm={openRewardForm} />
          )}
          <div className="flex gap-4 border-[1px] stroke-[0.83] stroke-[#E8EFF]  items-center justify-between px-3  py-[7px] rounded-lg">
            <div className="flex gap-1 items-center">
              <Link
                to="/dashboard"
                className="bg-[#F1F3F7] w-[40px] h-[40px] border-[1px] border-zinc-600 rounded-lg cursor-pointer flex items-center justify-center overflow-hidden"
              >
                {userImage?.length > 4 ? (
                  <img
                    className="w-full h-full  object-cover  scale-125 brightness-125 transition-all duration-500 ease-in"
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
  }
);

export default DashBoardNavbar;

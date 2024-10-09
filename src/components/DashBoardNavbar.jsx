import React, { useState } from "react";
import logo from "../assets/logo.png";
import search from "../assets/Search.svg";
import IconButton from "./littleComponents/IconButton";
import profileImage from "../assets/Group 1000005837.svg";
import downSvg from "../assets/down.svg";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
const DashBoardNavbar = ({ userImage }) => {
    const [drop , setdrop] = useState(false)
  const items = [
    {
      label: <a href="https://www.antgroup.com">View Profile</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">Update your details</a>,
      key: "1",
    },
    {
      label: <a href="https://www.aliyun.com">Change Password</a>,
      key: "2",
    },
    {
      label: <a href="https://www.aliyun.com">settings</a>,
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: "logout",
      key: "4",
    },
  ];

  const handleDropDown = () => {
    setdrop(!drop);
  }
  return (
    <div className="w-full fixed shadow-lg bg-slate-50 flex items-center z-[100] justify-between h-[60px] px-4 ">
      {/* logo */}
      <div className="flex gap-1 items-center justify-center">
        <img className="w-[50px] h-[50px]" src={logo} alt="" />

        <h1 className="text-black text-2xl font-headlandOne">PratiFal</h1>
      </div>
      {/* search */}
      <div className="group input w-[25vw] shadow mb-1 appearance-none border rounded py-2 px-3 text-sm text-black focus-within:border-[#58B9ED] hover:border-[#58B9ED] flex items-center justify-between">
        <input
          className="outline-none w-[80%]"
          placeholder="Search your reward"
        />
        <div>
          <img
            className="w-[15px] h-[15px] opacity-[50%]"
            src={search}
            alt=""
          />
        </div>
      </div>
      {/* right part */}
      <div className="flex items-center gap-4">
        <IconButton text="create" />
        <div className="flex gap-3">
          <Link className="bg-[#F1F3F7] w-[48px] border-[1px] border-zinc-600 h-[48px] rounded-full cursor-pointer flex items-center justify-center overflow-hidden">
            {userImage?.length > 4 ? (
              <img
                className="w-full h-full object-cover hover:scale-110 transition-all duration-500 ease-in"
                src={userImage}
              />
            ) : (
              <img
                src={profileImage}
                className="w-[17px] h-[18px] object-cover "
              />
            )}
          </Link>
          {/* <img className="cursor-pointer " src={downSvg} alt="" /> */}
          <Dropdown onClick={handleDropDown} className="flex cursor-pointer"
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
                <DownOutlined className={` transition-all duration-200 ease-in ${drop ? 'rotate-180' : ''}`}  />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default DashBoardNavbar;

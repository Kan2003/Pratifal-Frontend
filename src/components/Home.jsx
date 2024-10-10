import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashBoardNavbar from "./DashBoardNavbar";
import Card from "./littleComponents/Card";
import { useContext } from "react";
import { UserContext } from "../App";
const Home = ({ setIsAuthenticated }) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/v2/users/logout')
      console.log(response)
      if(response)
      {
        localStorage.removeItem("isAuthenticated");
      setIsAuthenticated(false);
      navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // console.log(user)
  // console.log(user.profile)
  

  return (
    <>
      <div className="w-full pt-[10vw] px-[5vw] relative">
      <div className="w-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
      </div>
    </div>
      <button onClick={handleLogout}>Logout</button>
      </div>
      
    </>
  );
};

export default Home;

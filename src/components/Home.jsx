import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashBoardNavbar from "./DashBoardNavbar";
import Card from "./littleComponents/Card";

const Home = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [user , setUser] = useState();

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
  useEffect(() => {
    const userDetails = async() => {
        try {
          const response = await axios.get('/api/v2/users/')
          // console.log(response.data.data)
          setUser(response.data.data)
        } catch (error) {
          console.log(error)
        }
    }
    userDetails();
  },[])

  return (
    <>
      <DashBoardNavbar userImage={user?.profile} />
      <div className="w-full pt-[10vw] px-[5vw] ">
        <div className="flex  flex-wrap gap-16">
        <Card/>
        </div>
      <button onClick={handleLogout}>Logout</button>
      </div>
      
    </>
  );
};

export default Home;

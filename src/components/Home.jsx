import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      <div>Home</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default Home;

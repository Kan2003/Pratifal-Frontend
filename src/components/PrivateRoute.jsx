import axios from "axios";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import DashBoardNavbar from "./DashBoardNavbar";

const PrivateRoute = ({ children, isAuthenticated, setIsAuthenticated }) => {
  const { user, setUser } = useContext(UserContext);
  const [tokens, setTokens] = useState({ accessToken: null, refreshToken: null });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get("/api/v2/users/verify-token", {
          withCredentials: true,
        });
        localStorage.setItem("isAuthenticated", data.isValid);
        setIsAuthenticated(data.isValid);
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const refreshTokenHandler = async () => {
    if (!tokens.refreshToken) return;

    try {
      console.log("Refreshing access token...");
      const { data } = await axios.post("/api/v2/users/refresh-token", {
        refreshToken: tokens.refreshToken,
      });

      if (data.success) {
        const newAccessToken = data.accessToken;
        setTokens((prev) => ({ ...prev, accessToken: newAccessToken }));
        console.log("Access token refreshed successfully:", newAccessToken);
      } else {
        console.error("Error refreshing token:", data.message);
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
    }
  };

  const checkTokenExpiry = () => {
    console.log("Checking access token expiration...");
    if (!tokens.accessToken) return;

    const accessTokenExpiry = new Date(tokens.accessToken.exp * 1000);
    console.log("Access Token Expiry Time:", accessTokenExpiry);
    const timeDiff = accessTokenExpiry - new Date();

    if (timeDiff <= 60000) {
      console.log("Access token is about to expire. Refreshing...");
      refreshTokenHandler();
    }
  };

  useEffect(() => {
    if (tokens.accessToken) {
      checkTokenExpiry();
      const intervalId = setInterval(checkTokenExpiry, 30000);
      return () => clearInterval(intervalId);
    }
  }, [tokens.accessToken]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get('/api/v2/users/');
        setUser(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [setUser]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
    try {
      const response = await axios.post('/api/v2/users/logout')
      // console.log(response)
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

  return (
    <>
      {isAuthenticated && <DashBoardNavbar handleLogout={handleLogout} user={user} userImage={user?.profile} />}
      {children}
    </>
  );
};

export default PrivateRoute;

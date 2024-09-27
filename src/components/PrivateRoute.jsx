import axios from "axios";
import React, { useEffect , useState } from "react";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({ children, isAuthenticated, setIsAuthenticated }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/v2/users/verify-token", {
          withCredentials: true,
        });
        localStorage.setItem("isAuthenticated", response.data.isValid); // Update localStorage
        setIsAuthenticated(response.data.isValid); // Set state for App.js
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("isAuthenticated"); // Clear localStorage on error
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  const refreshTokenHandler = async () => {
    try {
      console.log("Refreshing access token...");
      const response = await axios.post("/api/v2/users/refresh-token", {
        refreshToken,
      });

      if (response.data.success) {
        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);
        console.log("Access token refreshed successfully:", newAccessToken);
        // Update the access token in cookies or local storage (if applicable)
      } else {
        console.error("Error refreshing token:", response.data.message);
        // Handle token refresh failure (e.g., logout)
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle token refresh failure (e.g., logout)
    }
  };

  useEffect(() => {
    
    const checkTokenExpiry = () => {
      console.log("Checking access token expiration...");
      const accessTokenExpiry = new Date(accessToken.exp * 1000);
      console.log('access Token time' , accessTokenExpiry)
      const timeDiff = accessTokenExpiry - new Date();

      if (timeDiff <= 60000) {
        // Refresh token 1 minute before expiration
        console.log("Access token is about to expire. Refreshing...");
        refreshTokenHandler();
      }
    };

    if (accessToken) {
      checkTokenExpiry();
      const intervalId = setInterval(checkTokenExpiry, 30000); // Check every 30 seconds
      return () => clearInterval(intervalId);
    }
  }, [accessToken]);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

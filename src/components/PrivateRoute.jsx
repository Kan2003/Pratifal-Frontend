import axios from 'axios';
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated , setIsAuthenticated }) => {


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

  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

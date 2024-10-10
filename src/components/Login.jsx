import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RagisterLoginLayout from "./littleComponents/RagisterLoginLayout";
import Input from "./littleComponents/Input";
import Error from "./littleComponents/Error";
import Success from "./littleComponents/Success";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const buttonError =
    !showEmailError && !showPasswordError && password.length > 8 && email;

  const handleBlur = (e) => {
    if (e.target.id === "email") {
      setShowEmailError(email.trim() === "" || !/^\S+@\S+\.\S+$/.test(email));
    } else if (e.target.id === "password") {
      setShowPasswordError(password.trim() === "" || password.length < 8);
    }
  };

  

  const navigate = useNavigate();

  // const isLoggedIn = Boolean(localStorage.getItem("isAuthenticated")); // Replace with your authentication logic
  // console.log(isLoggedIn)
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate('/dashboard');
  //   }
  // }, [isLoggedIn, navigate]);

  const handleChange = (e) => {
    if (e.target.id === "email") {
      const value = e.target.value;
      setEmail(value);
      if (value.trim() !== "") {
        setShowEmailError(false);
      }
    } else if (e.target.id === "password") {
      const value = e.target.value;
      setPassword(value);
      if (value.trim() !== "") {
        setShowPasswordError(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const Response = await axios.post("/api/v2/users/login", {
        email,
        password,
      });

      if (Response.data.success) {
        // Assuming success response from the API
        setSuccess("Login successful!");
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      const status = error.response.status;
      if (status === 500) {
        setError("Internal Server Error, Please try again later.");
      } else if (status === 401) {
        setError("Invalid credentials");
      }
       else if (status === 404) {
        setError("User not found");
      }
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      {error && <Error error={error}/>}
      {success && <Success success={success}/>}

      <RagisterLoginLayout />
      <div className="w-[50vw] h-full flex items-start flex-col pt-[15vw] font-headlandOne px-[8vw]">
        <h1>Logo</h1>
        <form className="w-full h-full" onSubmit={handleSubmit}>
          <Input
            error={showEmailError}
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            text="please provide valid email Address"
          />
          <Input
            error={showPasswordError}
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            handleChange={handleChange}
            handleBlur={handleBlur}
            text="Password should contain more than 8 characters"
          />

          <button
            className={`w-full text-center  text-[14px] py-2 transition-all duration-300 ease-in-out rounded-lg ${
              buttonError ? "bg-[#58B9ED]" : "bg-[#58b9ed54] cursor-not-allowed"
            } `}
            type="submit"
            disabled={!buttonError}
          >
            Sign In
          </button>
          <h3 className="text-sm text-center mt-2">
            Don't have an account{" "}
            <Link className="text-[#58B9ED] underline" to="/register">
              sign up with Email
            </Link>{" "}
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Login;

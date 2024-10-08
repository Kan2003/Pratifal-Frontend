import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import RagisterLoginLayout from "./RagisterLoginLayout";
import Input from "./littleComponents/Input";
import cross from '../assets/cross-mark-svgrepo-com.svg'
import check from '../assets/check-svgrepo-com.svg'
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showFullnameError, setShowFullnameError] = useState(false);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const buttonError =
    !showEmailError &&
    !showPasswordError &&
    !showFullnameError &&
    !showUsernameError &&
    fullName &&
    name &&
    password.length > 8 &&
    email;

  const handleBlur = (e) => {
    if (e.target.id === "fullname") {
      setShowFullnameError(fullName.trim() === "");
    } else if (e.target.id === "name") {
      setShowUsernameError(name.trim() === "");
    } else if (e.target.id === "email") {
      setShowEmailError(email.trim() === "" || !/^\S+@\S+\.\S+$/.test(email));
    } else if (e.target.id === "password") {
      setShowPasswordError(password.trim() === "" || password.length < 8);
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "fullname") {
      const value = e.target.value;
      setFullName(value);
      if (value.trim() !== "") {
        setShowFullnameError(false);
      }
    } else if (e.target.id === "name") {
      const value = e.target.value;
      setName(value);
      if (value.trim() !== "") {
        setShowUsernameError(false);
      }
    } else if (e.target.id === "email") {
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

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    console.log("Form submission");
    try {
      const response = await axios.post("/api/v2/users/ragister", {
        username: name,
        email,
        password,
        fullname: fullName,
      });
      setSuccess("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setFullName("");
      setError("");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      const status = error.response.status;
      if (status === 500) {
        setError("Internal Server Error, Please try again later.");
      } else if (status === 400) {
        setError("userName & Email already registered");
      }
      setName("");
      setEmail("");
      setPassword("");
      setFullName("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 4000);
    }
  };

  return (
    <div className="w-full h-screen bg-white flex items-center justify-center relative">
      {error && (
        <div className=" absolute transition-all duration-300 ease-in top-5 left-1/2 flex items-center gap-2 -translate-x-1/2 rounded-lg bg-[#00000013] py-2 px-6">
          <img className="w-[20px] h-[20px]" src={cross} alt="" />
          <p className="text-black text-center">{error}</p>
        </div>
      )}
      {success && (
       <div className=" absolute transition-all duration-300 ease-in top-5 left-1/2 flex items-center gap-2 -translate-x-1/2 rounded-lg bg-[#00000013] py-2 px-6">
       <img className="w-[20px] h-[20px]" src={check} alt="" />
       <p className="text-black text-center">{success}</p>
     </div>
      )}
      <RagisterLoginLayout />
      <div className="w-[50vw] h-full flex items-start flex-col pt-[15vw] font-headlandOne px-[8vw]">
        <h1>Logo</h1>
        <form className="w-full h-full" onSubmit={handleSubmit}>
          <Input
            error={showFullnameError}
            id="fullname"
            type="text"
            placeholder="Fullname"
            value={fullName}
            handleChange={handleChange}
            handleBlur={handleBlur}
            text="FullName should not be empty."
          />
          <Input
            error={showUsernameError}
            id="name"
            type="text"
            placeholder="Username"
            value={name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            text="Username should not be empty"
          />
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
            Create Your Account
          </button>
          <h3 className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link className="text-[#58B9ED] underline" to="/login">
              Log In
            </Link>{" "}
          </h3>
        </form>
      </div>
    </div>
  );
};

export default Register;

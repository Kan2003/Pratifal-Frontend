import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      setError("userName & Email already registered");
      setName("");
      setEmail("");
      setPassword("");
      setFullName("");
      setTimeout(() => {
        setError("");

        setSuccess("");
      }, 3000);
    }
  };

  return (
    <div className="w-full h-screen bg-zinc-900 flex justify-center relative">
      {error && (
        <div className=" absolute top-3 right-0 w-[30vw] bg-red-400 py-3 px-6">
          <p className="text-black text-center">{error}</p>
        </div>
      )}
      {success && (
        <div className=" absolute top-3 right-0 w-[30vw] bg-green-400 py-3 px-6">
          <p className="text-black text-center">{success}</p>
        </div>
      )}

      <div className="w-[30vw] h-[60vh] pt-4 px-8">
        <div className="w-full h-full">
          <h2 className="text-center text-3xl text-white py-3">Logo</h2>
          <form className="mt-12 px-8" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-medium mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-4 px-3 bg-zinc-900 text-white focus:outline-none focus:border-gray-500"
                id="fullName"
                type="text"
                placeholder="Full Name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-medium mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-4 px-3 bg-zinc-900 text-white focus:outline-none focus:border-gray-500"
                id="username"
                type="text"
                placeholder="Username"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-medium mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-4 px-3 bg-zinc-900 text-white focus:outline-none focus:border-gray-500"
                id="email"
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-white text-lg font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-4 px-3 bg-zinc-900 text-white focus:outline-none focus:border-gray-500"
                id="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex w-full items-center justify-center">
              <div className="text-white text-sm">
                Already have an account?{" "}
                <Link className="text-blue-500" to="/login">
                  Login
                </Link>
              </div>
            </div>
            <div className="w-full text-center py-5">
              <button
                type="submit"
                className="py-3 px-4 text-[18px] text-white bg-blue-500 rounded-md"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

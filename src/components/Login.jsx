import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
const Login = ({setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async(e) => {
      e.preventDefault();

      try {
        const Response = await axios.post('/api/v2/users/login', {
          email,
          password,
        })
        console.log(Response)
        if (Response.data.success) { // Assuming success response from the API
          console.log(Response)
          setSuccess("Login successful!");
          setIsAuthenticated(true)
          localStorage.setItem('isAuthenticated', 'true');
          navigate('/dashboard')
        }
      } catch (error) {
        console.log(error)
        setError("invalid credentials");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      }
  }
  return (
    <div className="w-full h-screen bg-zinc-900 flex items-center justify-center relative">
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

      <div className="w-[30vw] h-[80vh] py-4 px-8">
        <div className="w-full">
          <h2 className="text-center text-3xl text-white py-3">Logo</h2>
          <form className="my-24 px-8" onSubmit={handleSubmit}>

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
                Ragister yourself{" "}
                <Link className="text-blue-500" to="/ragister">
                  Ragister
                </Link>
              </div>
            </div>
            <div className="w-full text-center py-5">
              <button
                type="submit"
                className="py-3 px-4 text-[18px] text-white bg-blue-500 rounded-md"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
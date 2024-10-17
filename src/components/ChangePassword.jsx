import React, { useState } from "react";
import Input from "./littleComponents/Input";
import axios from "axios";
import Error from "./littleComponents/Error";
import Success from "./littleComponents/Success";
import coupon from "../assets/coupon.svg";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldText, setOldText] = useState("Old password is required.");
  const [newText, setNewText] = useState("New password is required");
  const [confirmText, setConfirmText] = useState(
    "Confirm password is required"
  );
  const [showOldPasswordError, setShowOldPasswordError] = useState(false);
  const [showNewPasswordError, setShowNewPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);

  // const buttonError =
  // setShowOldPasswordError &&
  // setShowNewPasswordError &&
  // setShowConfirmPasswordError;

  const handleBlur = (e) => {
    if (e.target.id === "old") {
      if (oldPassword.trim() === "") {
        setOldText("Old password is required.");
        setShowOldPasswordError(true);
      } else if (e.target.value.length < 8) {
        setOldText("Password should be at least 8 characters long.");
        setShowOldPasswordError(true);
      }
    } else if (e.target.id === "new") {
      if (newPassword.trim() === "") {
        setNewText("new password is required.");
        setShowNewPasswordError(true);
      } else if (e.target.value.length < 8) {
        setNewText("Password should be at least 8 characters long.");
        setShowNewPasswordError(true);
      }
    } else if (e.target.id === "confirm") {
      if (confirmPassword.trim() === "") {
        setConfirmText("confirm password is required.");
        setShowConfirmPasswordError(true);
      } else if (e.target.value.length < 8) {
        setConfirmText("Password should be at least 8 characters long.");
        setShowConfirmPasswordError(true);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "old") {
      const value = e.target.value;
      setOldPassword(value);
      if (value.trim() !== "") {
        setShowOldPasswordError(false);
      }
    } else if (e.target.id === "new") {
      const value = e.target.value;
      setNewPassword(value);
      if (value.trim() !== "") {
        setShowNewPasswordError(false);
      }
    } else if (e.target.id === "confirm") {
      const value = e.target.value;
      setConfirmPassword(value);
      if (value.trim() !== "") {
        setShowConfirmPasswordError(false);
      }
    }
  };

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch("/api/v2/users/update-password", {
        currentPassword: oldPassword,
        newPassword: newPassword,
        reTypeNewPassword: confirmPassword,
      });

      console.log(response);
      console.log("password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setShowOldPasswordError(false);
      setShowNewPasswordError(false);
      setShowConfirmPasswordError(false);
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      setSuccess("Password updated successfully!");
    } catch (error) {
      console.log(error.status);
      const status = error.status;

      if (status === 408) {
        setError("New password and Confirm password must be same.");
      }
      if (status === 402) {
        setError("current password is not a valid");
      }
      if (status === 401) {
        setError("All field are required");
      }
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
  };
  return (
    <div className="w-full h-screen  flex">
      {error && <Error error={error} />}
      {success && <Success success={success} />}
      <div className="w-[70%] h-full bg-[#002fec96] flex items-center justify-center">
        <div className="w-full">
          <h2 className="text-center font-Harmattan font-bold text-[80px] leading-[90%]">
            Update Your Password
          </h2>
          <h3 className="text-center font-Harmattan font-semibold tracking-wide">
            Your Deals, Your Way. Store coupons and rewards securely in one
            place. Easy to find, easy to redeem .
          </h3>
        </div>
      </div>
      <div className="h-full w-[30%] px-[5vw] flex flex-col py-[10vw] items-center">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="w-full">
            <label
              htmlFor="title"
              className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
            >
              Old Password
            </label>
            <Input
              error={showOldPasswordError}
              id="old"
              type="password"
              placeholder="Enter your old Password"
              value={oldPassword}
              handleChange={handleChange}
              handleBlur={handleBlur}
              text={oldText}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="title"
              className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
            >
              New Password
            </label>
            <Input
              error={showNewPasswordError}
              id="new"
              type="password"
              placeholder="New Password"
              value={newPassword}
              handleChange={handleChange}
              handleBlur={handleBlur}
              text={newText}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="title"
              className="block text-[16px] leading-none font-medium font-Harmattan text-gray-700"
            >
              Confirm Password
            </label>
            <Input
              error={showConfirmPasswordError}
              id="confirm"
              type="password"
              placeholder="Retype your new Password"
              value={confirmPassword}
              handleChange={handleChange}
              handleBlur={handleBlur}
              text={confirmText}
            />
          </div>
          <button
            className={`w-full text-black text-[12px] tracking-wide py-2 rounded-lg bg-[#58B9ED] font-headlandOne mt-4  `}
            type="submit"
            // disabled={!buttonError}
          >
            Update Passsword
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
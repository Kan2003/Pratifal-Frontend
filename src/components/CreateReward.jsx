import React, { useContext, useState } from "react";
import Input from "./littleComponents/Input";
import cross from "../assets/cross.svg";
import axios from "axios";
import Error from "./littleComponents/Error";
import Success from "./littleComponents/Success";

const CreateReward = ({ setShowCreateForm }) => {
  const [title, setTitle] = useState("");
  const [showTitleError, setShowTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [showCouponError, setShowCouponError] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [showExpiryDateError, setShowExpiryDateError] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const currentDate = new Date().setHours(0, 0, 0, 0);

  const handleBlur = (e) => {
    if (e.target.id === "title") {
      setShowTitleError(title.trim() === "");
    } else if (e.target.id === "description") {
      setShowDescriptionError(description.trim() === "");
    } else if (e.target.id === "coupon") {
      setShowCouponError(coupon.trim() === "");
    } else if (e.target.id === "expiryDate") {
      const selectedDate = new Date(expiryDate).setHours(0, 0, 0, 0);

      setShowExpiryDateError(
        expiryDate.trim() === "" || selectedDate < currentDate
      );
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "title") {
      const value = e.target.value;
      setTitle(value);
      if (value.trim() !== "") {
        setShowTitleError(false);
      }
    } else if (e.target.id === "description") {
      const value = e.target.value;
      setDescription(value);
      if (value.trim() !== "") {
        setShowDescriptionError(false);
      }
    } else if (e.target.id === "coupon") {
      const value = e.target.value;
      setCoupon(value);
      if (value.trim() !== "") {
        setShowCouponError(false);
      }
    } else if (e.target.id === "expiryDate") {
      const value = e.target.value;
      setExpiryDate(value);
      const selectedDate = new Date(expiryDate).setHours(0, 0, 0, 0);
      if (value.trim() !== "" && selectedDate >= currentDate) {
        setShowExpiryDateError(false);
      }
      else {
        setShowExpiryDateError(true);
      }
    }
  };

  //   create a reward
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v2/reward/create-reward", {
        title,
        description,
        couponCode: coupon,
        expiryDate: new Date(expiryDate),
      });
      console.log(response);
      if (response.status === 201) {
        setSuccess("Reward created successfully");
      }
      setShowCreateForm(false);
    } catch (error) {
      // const status = error.response.status
      console.log(status);
      console.log(error);
      if (status === 409) {
        setError("coupon code already Exists!");
      } else if (status === 407) {
        setError("expiry date exceeded");
      }
      setTitle("");
      setDescription("");
      setCoupon("");
      setExpiryDate("");
      setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
    }
  };

  return (
    <>
      {error && <Error error={error} />}
      {success && <Success success={success} />}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-[20%] backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-lg px-6 py-3 w-[30vw]">
          <div className="flex items-center justify-between">
            <h1 className=" text-[20px] font-Harmattan">Create Reward</h1>
            <img
              onClick={() => setShowCreateForm(false)}
              className="w-[45px] h-[45px] cursor-pointer"
              src={cross}
              alt=""
            />
          </div>
          <form action="" onSubmit={handleSubmit}>
            <Input
              error={showTitleError}
              id="title"
              type="text"
              placeholder="title"
              value={title}
              handleChange={handleChange}
              handleBlur={handleBlur}
              text="Title is required."
            />
            <Input
              error={showDescriptionError}
              id="description"
              type="text"
              placeholder="Description"
              value={description}
              handleChange={handleChange}
              handleBlur={handleBlur}
              text="Description is required."
            />
            <Input
              error={showCouponError}
              id="coupon"
              type="text"
              placeholder="Coupon"
              value={coupon}
              handleChange={handleChange}
              handleBlur={handleBlur}
              text="Coupon Code is required."
            />
            <Input
              error={showExpiryDateError}
              id="expiryDate"
              type="Date"
              placeholder="expiry date"
              value={expiryDate}
              handleChange={handleChange}
              handleBlur={handleBlur}
              text="ExpiryDate is required."
            />
            <button
              className="w-full text-white text-[15px] tracking-wide py-2 rounded-lg bg-[#58B9ED] font-headlandOne "
              type="submit"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateReward;

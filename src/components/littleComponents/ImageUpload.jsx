import axios from "axios";
import React, { useState } from "react";
import Error from "./Error";
import Success from "./Success";
import cross from '../../assets/cross.svg'

const ImageUpload = ({ setImageUpload, user, setUser }) => {
  // console.log(user)
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const formData = new FormData();
      formData.append("profile", file);

      try {
        // Make API call to upload the image
        const response = await axios.patch(
          "/api/v2/users/update-profile",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response);
        if (response.status === 200) {
          console.log(response.data.data.profile);
          setSuccess("Profile image updated successfully");
          console.log("succcessfully updated profile image");

          const updatedUser = response.data.data;
          setUser(updatedUser);
          setTimeout(() => {
            setImageUpload(false);
          }, 2000)
        }
      } catch (err) {
        console.error(err);
        setError("Error uploading profile image");
      }
    }
  };

  return (
    <>
      {error && <Error error={error} />}
      {success && <Success success={success} />}
      <div className="fixed  inset-0 flex items-center justify-center bg-black bg-opacity-[10%] backdrop-blur-sm">
        <img className="absolute right-2 top-14 cursor-pointer" onClick={() => setImageUpload(false)} src={cross} alt="" />
        <input
          // ref={fileInputRef}
          type="file"
          accept="image/*"
          // style={{ display: "none" }}
          onChange={handleImageUpload}
        />
      </div>
    </>
  );
};

export default ImageUpload;

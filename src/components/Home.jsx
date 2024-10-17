import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../App";

import Card from "./littleComponents/Card";
import axios from "axios";
import CreateReward from "./CreateReward";
import coupon from "../assets/coupon.svg";
const Home = () => {
  const { search = "", showCreateForm, setShowCreateForm } = useContext(UserContext);

  
  const [totalReward, setTotalReward] = useState([]);

  // console.log(search)

  useEffect(() => {
    const allRewards = async () => {
      try {
        const response = await axios.get("/api/v2/reward/");

        setTotalReward(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    allRewards();
  }, []);

  // search functionality

  const filterRewards = useMemo(() => {
    if (!search) return totalReward; // Show all rewards if search is empty

    return totalReward.filter((reward) => {
      const couponCodeMatch = reward?.couponCode
        ?.toLowerCase()
        ?.includes(search?.toLowerCase());
      const titleMatch = reward?.title
        ?.toLowerCase()
        ?.includes(search?.toLowerCase());
      return couponCodeMatch || titleMatch;
    });
  }, [totalReward, search]);

  //

  return (
    <>
      <div className="w-full pt-[10vw] pb-[5vw] px-[5vw] relative ">
        <div className="w-full ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filterRewards.length > 0 ? (
              filterRewards.map((reward, index) => (
                <Card
                  key={index}
                  reward={reward}
                  id={reward._id}
                  setTotalReward={setTotalReward}
                  totalReward={totalReward}
                />
              ))
            ) : (
              totalReward.length > 0 ? (
                <div className="col-span-full h-[60vh] flex  items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-semibold font-hanken-grotesk">
                    No results found
                  </p>
                </div>
              </div>
              ) : (
                <div className="col-span-full h-[60vh] flex  items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-semibold font-hanken-grotesk">
                    Add your first Coupon <span>
              <img className="inline-block w-[50px]" src={coupon} alt="" />
            </span>{" "}
                  </p>
                </div>
              </div>
              )
            )}
          </div>
          {showCreateForm && (
            <CreateReward setShowCreateForm={setShowCreateForm} totalReward={totalReward} setTotalReward={setTotalReward} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

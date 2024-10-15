import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

import Card from "./littleComponents/Card";
import axios from "axios";
import CreateReward from "./CreateReward";

const Home = () => {
  const {search , showCreateForm , setShowCreateForm} = useContext(UserContext)
  const [rewards , setRewards] = useState([]);


  useEffect(() => {
    const allRewards = async () => {
      try {
        const response = await axios.get("/api/v2/reward/");
        
        setRewards(response.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    allRewards();
  }, [setRewards , rewards]);

  
  // search functionality 

  const filterRewards = rewards.filter((reward) => {
    const couponCodeMatch = reward?.couponCode?.toLowerCase()?.includes(search?.toLowerCase());
    const titleMatch = reward?.title?.toLowerCase()?.includes(search?.toLowerCase());
    return couponCodeMatch || titleMatch;
  })

  const rewardsToDisplay = filterRewards.length > 0 ? filterRewards : rewards;

  return (
    <>
      <div className="w-full pt-[10vw] pb-[5vw] px-[5vw] relative">
        <div className="w-full ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {
              rewardsToDisplay.map((reward, index) => (
                <Card key={index} reward={reward} id={reward._id} setRewards={setRewards} rewards={rewards} />
              ))
            }
          </div>
          {showCreateForm && <CreateReward setShowCreateForm={setShowCreateForm} />}
        </div>
      </div>
    </>
  );
};

export default Home;

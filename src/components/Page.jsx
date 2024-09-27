import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Lenis from 'lenis'
const Page = () => {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
  return (
    <div className="w-full h-[300vh] bg-zinc-900">
      <Navbar />
      <p>ddfd</p>
    </div>
  );
};

export default Page;

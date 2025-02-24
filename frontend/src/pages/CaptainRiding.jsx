// import React from 'react'

import { Link } from "react-router-dom";
import FinishRide from "../Components/FinishRide";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const FinishRidePanelRef = useRef(null);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(FinishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(FinishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <h2 className="text-3xl font-bold text-left w-16 absolute left-5 top-5  ">
          Keshav
        </h2>
        <Link
          to="/captain-home"
          className="fixed right-4 top-4 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <img
          className="h-full w-full object-cover"
          src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
          alt=""
        />
      </div>

      <div className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400" 
      onClick={()=>{
        setFinishRidePanel(true)
      }}>
        <h5
          className="p-1 text-center w-[95%] absolute top-0"
          onClick={() => {}}
        >
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 Km away</h4>
        <button className="bg-green-600 text-white font-semibold rounded-lg p-3 px-10">
          Complete Ride
        </button>
      </div>
      <div
        ref={FinishRidePanelRef}
        className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRide setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;

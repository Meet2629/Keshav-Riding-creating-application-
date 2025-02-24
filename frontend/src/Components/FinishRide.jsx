// import React from 'react'

import { Link } from "react-router-dom";

const FinishRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">
        Finish this Ride 
      </h3>

      <div className="flex items-center justify-between mt-4 p-4 border-2 rounded-lg  border-yellow-400">
        <div className="flex items-center gap-3 justify-between">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg"
            alt=""
          />
          <h2 className="text-lg font-medium">Milan Vaghasiya</h2>
        </div>
        <h5 className="text-lg font-semibold ">2.2 km</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                kankariya Talab,Ahmedabad,Gujarat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                kankariya Talab,Ahmedabad,Gujarat
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.20</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>

        <div className="mt-10 w-full">
          
            <Link
              to="/captain-home"
              className="w-full mt-2 flex justify-center text-lg  bg-green-600 text-white font-semibold rounded-lg p-3"
            >
            Finish Ride
            </Link>
         
        </div>
      </div>
    </div>
  );
};

export default FinishRide;

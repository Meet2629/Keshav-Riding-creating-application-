import { useState, useRef, useContext, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from './../Components/ConfirmRide';
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from './../Components/WaitingForDriver';
import axios from 'axios';
import { SocketContext } from './../context/SocketContext';
import { UserDataContext } from './../context/UserContext';

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const vehiclePanelRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ ride, setRide ] = useState(null);

  const { user } = useContext(UserDataContext);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (user && user._id) {
      socket.emit("join", { userType: "user", userId: user._id });
    } else {
      console.error("User or _id is null");
    }
  }, [user, socket]);

  useEffect(() => {
    socket.on('ride_confirmed', ride => {
      setVehicleFound(false);
      setWaitingForDriver(true);
      setRide(ride);
    });
  }, [socket]);

//   socket.on('ride-confirmed', ride => {
//     setVehicleFound(false)
//     setWaitingForDriver(true)
//     setRide(ride)
// });

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found! User might not be authenticated.");
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPickupSuggestions(response.data);
    } catch (err) {
      console.error("Error fetching pickup suggestions:", err);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found! User might not be authenticated.");
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDestinationSuggestions(response.data);
    } catch (err) {
      console.error("Error fetching destination suggestions:", err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion);
    } else if (activeField === 'destination') {
      setDestination(suggestion);
    }
    setPanelOpen(false);  // Close the suggestion panel after selection
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, { height: "70%", padding: 24 });
        gsap.to(panelCloseRef.current, { opacity: 1 });
      } else {
        gsap.to(panelRef.current, { height: "0%", padding: 0 });
        gsap.to(panelCloseRef.current, { opacity: 0 });
      }
    },
    [panelOpen]
  );

  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [vehiclePanel]);

  useGSAP(function () {
    if (ConfirmRidePanel) {
      gsap.to(ConfirmRidePanelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(ConfirmRidePanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [ConfirmRidePanel]);

  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)' });
    }
  }, [vehicleFound]);

  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(waitingForDriverRef.current, { transform: 'translateY(100%)' });
    }
  }, [waitingForDriver]);

  async function findTrip() {
    if (!pickup || !destination) {
      console.error("Pickup or destination is missing!");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found! User might not be authenticated.");
      return;
    }

    console.log("Fetching fare for:", { pickup, destination });

    try {
      setVehiclePanel(true);
      setPanelOpen(false);

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: { Authorization: `Bearer ${token}` }
      });

      setFare(response.data);
      console.log("Fare received:", response.data);
    } catch (error) {
      console.error("Error fetching fare:", error.response?.data || error.message);
    }
  }

  async function createRide() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found! User might not be authenticated.");
      return;
    }

    if (!user || !user._id) {
      console.error("User information is missing!");
      return;
    }

    if (!pickup || !destination || !vehicleType || !fare[vehicleType]) {
      console.error("Required fields are missing!");
      return;
    }

    const fareValue = fare[vehicleType]; // Ensure fare is properly formatted
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit OTP

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType, fare: fareValue, user: user._id, otp }, // Include user ID and OTP
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      setVehicleFound(true); // Show the "Looking for Driver" page
      setConfirmRidePanel(false); // Hide the Confirm Ride panel
    } catch (error) {
      console.error("Error creating ride:", error.response?.data || error.message);
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      <h2 className="text-3xl font-bold text-left w-16 absolute left-5 top-5">Keshav</h2>
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://www.hanbit.co.kr/data/editor/20210429161116_qvzgnfvw.gif"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 top-6 right-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className="line absolute h-16 w-1 top-[35%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
              type="text"
              placeholder='Add a pick-up location'
            />
            <input
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
              type="text"
              placeholder='Enter your destination'
            />
          </form>
          <button
            onClick={findTrip}
            className="bg-black text-white w-full px-4 py-2 rounded-lg mt-4">
            Find a Trip
          </button>
        </div>

        <div ref={panelRef} className="bg-white h-0">
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
            handleSuggestionClick={handleSuggestionClick}  // Passed the suggestion click handler
          />
        </div>
      </div>

      {/* Vehicle Panel */}
      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <VehiclePanel
          setVehicleType={setVehicleType}
          fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
      </div>

      {/* Confirm Ride Panel */}
      <div ref={ConfirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
      </div>

      {/* Vehicle Found Panel */}
      <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound} />
      </div>

      {/* Waiting for Driver Panel */}
      <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12">
        <WaitingForDriver
          ride={ride}
          setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;

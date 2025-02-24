import { useRef, useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CaptainDetails from '../Components/CaptainDetails';
import RidePopUp from '../Components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopUp from '../Components/ConfirmRidePopUp';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false);
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
    const ridePopupPanelRef = useRef(null);
    const confirmRidePopupPanelRef = useRef(null);
    const [ride, setRide] = useState(null);

    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!socket || !captain?._id) return;

        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        });

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                });
            }
        };

        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();

        return () => clearInterval(locationInterval);
    }, [socket, captain]);

    useEffect(() => {
        if (!socket) return;

        const handleNewRide = (data) => {
            setRide(data);
            setRidePopupPanel(true);
        };

        socket.on('new-ride', handleNewRide);

        return () => {
            socket.off('new-ride', handleNewRide);
        };
    }, [socket]);

    const refreshAccessToken = async () => {
        try {
            const res = await axios.post('http://localhost:4000/auth/refresh-token', {}, { withCredentials: true });
            return res.data.accessToken;  // Return the new token
        } catch (error) {
            console.error('Failed to refresh token:', error);
            return null;
        }
    };
    
    const confirmRide = async () => {
        try {
            const token = localStorage.getItem('token');
    
            let res = await axios.post('http://localhost:4000/rides/confirm', { rideId: ride._id }, {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            console.log('✅ Ride confirmed:', res.data);
            setRidePopupPanel(false);
            setConfirmRidePopupPanel(true);
        } catch (error) {
            if (error.response?.status === 401 && error.response?.data.message.includes('Token expired')) {
                console.warn('⚠ Token expired, refreshing...');
    
                const newToken = await refreshAccessToken();
                if (newToken) {
                    localStorage.setItem('token', newToken);
                    return confirmRide();  // Retry the request with the new token
                }
            }
    
            console.error('❌ Error confirming ride:', error.response?.data);
        }
    };

    useGSAP(() => {
        gsap.to(ridePopupPanelRef.current, {
            transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)'
        });
    }, [ridePopupPanel]);

    useGSAP(() => {
        gsap.to(confirmRidePopupPanelRef.current, {
            transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)'
        });
    }, [confirmRidePopupPanel]);

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <Link to='/captain-home'>
                    <h2 className="text-3xl font-bold text-left w-16 absolute left-5 top-5">Keshav</h2>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    );
};

export default CaptainHome;

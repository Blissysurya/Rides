import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainHome = () => {
    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(false) // Changed from true to false

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain, setCaptain } = useContext(CaptainDataContext)

    useEffect(() => {
        // Add safety checks to prevent null reference errors
        if (!socket || !captain || !captain._id) return;
        
        console.log("Emitting join event for captain:", captain._id);
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        
        // Setup location updates with better error handling
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        console.log("Updating captain location:", {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                        
                        socket.emit('update-location-captain', {
                            userId: captain._id,
                            location: {
                                ltd: position.coords.latitude,
                                lng: position.coords.longitude
                            }
                        });
                    },
                    error => {
                        console.error("Geolocation error:", error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                console.error("Geolocation not supported by this browser");
            }
        };

        // Call immediately and then set interval
        updateLocation();
        const locationInterval = setInterval(updateLocation, 10000);
        
        // Clean up the interval when component unmounts
        return () => clearInterval(locationInterval)
        
    }, [socket, captain])

    useEffect(() => {
        if (!socket) return;

        // Improve event handling with better debugging
        const handleNewRide = (data) => {
            console.log("⭐ New ride received:", data);
            setRide(data);
            setRidePopupPanel(true);
        };
        
        // Add a listener for socket connection status
        const handleConnect = () => {
            console.log("Socket connected:", socket.id);
        };
        
        const handleDisconnect = (reason) => {
            console.warn("Socket disconnected:", reason);
        };
        
        const handleError = (error) => {
            console.error("Socket error:", error);
        };

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('error', handleError);
        socket.on('new-ride', handleNewRide);

        // Add test function to check if socket is working
        window.testSocket = () => {
            console.log("Socket connected:", socket.connected);
            console.log("Socket ID:", socket.id);
        };

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('error', handleError);
            socket.off('new-ride', handleNewRide);
            delete window.testSocket;
        };
    }, [socket]);

    async function confirmRide() {
        try {
            // Add some error handling and logging
            console.log("Confirming ride:", ride);
            
            if (!ride || !ride._id) {
                console.error("No valid ride to confirm");
                return;
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
                rideId: ride._id,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log("Ride confirmed:", response.data);
            
            // Make sure we close the first panel before opening the second
            setRidePopupPanel(false);
            // Add a small delay to ensure proper transition
            setTimeout(() => {
                setConfirmRidePopupPanel(true);
            }, 300);
        } catch (error) {
            console.error("Error confirming ride:", error.response?.data || error.message);
            alert("Failed to confirm ride. Please try again.");
        }
    }

    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ ridePopupPanel ])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePopupPanel ])
    
    // Modify the captain data fetching useEffect
    useEffect(() => {
        // No need to fetch captain data here, since CaptainProtectedWrapper already does it
        // Just check if captain data is available and log it
        if (captain && captain._id) {
            console.log("Captain data already loaded:", captain._id);
            setIsLoading(false);
        }
    }, [captain]);

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-logout' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
            </div>
            <div className='h-2/5 p-6'>
                {!captain ? (
                    <div className='flex justify-center items-center h-full'>
                        <p>Loading captain details...</p>
                    </div>
                ) : (
                    <CaptainDetails captain={captain} />
                )}
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
    )
}

export default CaptainHome
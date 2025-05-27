import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = (props) => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    const location = useLocation(); // Access location object
    const rideData = location.state?.ride; // Retrieve ride data from state

    useGSAP(function () {
        if (finishRidePanel) {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(0)',
            });
        } else {
            gsap.to(finishRidePanelRef.current, {
                transform: 'translateY(100%)',
            });
        }
    }, [finishRidePanel]);

    return (
        <div className='h-screen relative flex flex-col justify-end'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
               
                <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className='text-lg font-bold ri-logout-box-r-line '></i>
                </Link>
            </div>
            
            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'
                onClick={() => {
                    setFinishRidePanel(true);
                }}
            >
                <h5 className="p-1 text-center absolute w-[90%] top-0">
                    <i className="text-3xl text-gray-800 ri-arrow-up-wide-line" />
                </h5>
                <div>
                    <h4 className='text-xl font-semibold'>{rideData?.pickup} → {rideData?.destination}</h4> {/* Use rideData */}
                    <p className='text-lg text-gray-700'>Fare: ₹{rideData?.fare}</p> {/* Use rideData */}
                </div>
                <button className='mt-1 bg-green-600 text-white font-semibold px-8 p-3 rounded-lg'>
                    Complete Ride
                </button>
            </div>

            <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
            </div>
            <div className='h-screen fixed w-screen top-0 z-[-1] '>
                <LiveTracking />
            </div>
        </div>
    );
};

export default CaptainRiding;
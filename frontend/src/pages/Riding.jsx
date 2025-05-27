import React, { useEffect, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import { SocketContext } from '../context/SocketContext'; // Correct import for SocketContext
import LiveTracking from '../components/LiveTracking';

const Riding = () => {
    const location = useLocation(); // Access location object
    const ride = location.state?.ride; // Retrieve ride data from state
    const navigate = useNavigate();
    const { socket } = useContext(SocketContext); // Use SocketContext correctly

    useEffect(() => {
        // Listen for the "ride-ended" event
        socket.on("ride-ended", () => {
            navigate('/home');
        });

        // Cleanup the event listener on component unmount
        return () => {
            socket.off("ride-ended");
        };
    }, [socket, navigate]);

    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className='text-lg font-bold ri-home-5-line'></i>
            </Link>
            <div className='h-1/2'>
                <LiveTracking />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <img
                        className="h-10"
                        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                        alt="Vehicle"
                    />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>{ride?.captain?.fullname?.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
                        <p className='font-small text-gray-600'>{ride?.captain?.vehicle?.vehicleType}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-5 items-center">
                    <div className="flex flex-col gap-3 w-full">
                        {/* Pickup Location */}
                        <div className="flex items-center gap-3 p-3 border-b-2">
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">Pickup</h3>
                                <p className="text-sm -mt-1 text-gray-600">{ride?.pickup}</p>
                            </div>
                        </div>

                        {/* Destination */}
                        <div className="flex items-center gap-3 p-3 border-b-2">
                            <i className="text-lg ri-map-pin-2-fill"></i>
                            <div>
                                <h3 className="text-lg font-medium">Destination</h3>
                                <p className="text-sm -mt-1 text-gray-600">{ride?.destination}</p>
                            </div>
                        </div>

                        {/* Fare */}
                        <div className="flex items-center gap-3 p-3 border-b-2">
                            <i className="text-lg ri-currency-line"></i>
                            <div>
                                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                                <p className="text-sm -mt-1 text-gray-600">Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="w-full bg-green-600 font-semibold p-2 rounded-lg">Make a Payment</button>
            </div>
        </div>
    );
};

export default Riding;
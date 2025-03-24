import React from 'react'
import { Link } from 'react-router-dom';
const FinishRide = (props) => {
    return (
        <div >
            <h5
                onClick={() => {
                    props.setFinishRidePanel(false);
                }}
                className="p-1 text-center absolute w-[93%] top-0"
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line" />
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>

            <div className='flex items-center justify-between mt-4 p-4 border-2 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3 '>
                    <img className='h-14 w-12 rounded-full object-cover' src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"></img>
                    <h2 className='text-xl font-medium'>Sassy</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>

            <div className="flex flex-col gap-5 items-center">
                {/* <img
  className="h-20"
  src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
  alt="Vehicle"
/> */}

                <div className="flex flex-col gap-3 w-full">
                    {/* Pickup Location */}
                    <div className="flex items-center gap-3 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">NexEra Colony, Hardoi</p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-center gap-3 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">NexEra Colony, Hardoi</p>
                        </div>
                    </div>

                    {/* Fare */}
                    <div className="flex items-center gap-3 p-3 border-b-2">
                        <i className="text-lg ri-currency-line"></i>
                        <div>
                            <h3 className="text-lg font-medium">$10</h3>
                            <p className="text-sm -mt-1 text-gray-600">Cash</p>
                        </div>
                    </div>
                </div>





                <div className='mt-6 w-full'>


                    <Link to='/captain-home' className="flex justify-center w-full mt-4 text-lg bg-green-600 text-white font-semibold p-3 rounded-lg">
                        Finish Ride
                    </Link>

                    <p className=' mt-10 text-xm'>Click on finish ride button if you have completed the payment</p>

                </div>
            </div>
        </div>
    )
}

export default FinishRide
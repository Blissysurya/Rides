import React from 'react'
import { Link } from 'react-router-dom'
const Riding = () => {
  return (
   
        <div className='h-screen'>
            <Link to='/home' className='fixed  right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className='text-lg font-bold ri-home-5-line '></i>
            </Link>
            <div className='h-1/2'>
                <img className='h-full w-full object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABLUH3RR9WY4ogN9jIsbV0QTaQWXDvEWW1A&s'></img>
            </div>
            <div className='h-1/2 p-4'>
            <div className='flex items-center justify-between'>
       <img
          className="h-10"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt="Vehicle"
        />
        <div className='text-right'>
            <h2 className='text-lg font-medium'> Sarthak
            </h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>UP 30 XY 1234</h4>
            <p className='font-small text-gray-600'>Mercedes Benz</p>
        </div>
   </div>

    <div className="flex flex-col gap-5 items-center">
     
      <div className="flex flex-col gap-3 w-full">
        {/* Pickup Location */}
        

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

      
    </div>
                <button className="w-full bg-green-600 font-semibold p-2 rounded-lg">Make a Payment</button>
            </div>
        </div>
    
  )
}

export default Riding
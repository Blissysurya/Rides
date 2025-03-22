import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className="p-5">
    <h5
      onClick={() => {
        props.setconfirmRidePanel(false);
      }}
      className="p-1 text-center absolute w-[93%] top-0"
    >
      <i className="text-3xl text-gray-200 ri-arrow-down-wide-line" />
    </h5>
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

      
    </div>
  </div>
  )
}

export default WaitingForDriver
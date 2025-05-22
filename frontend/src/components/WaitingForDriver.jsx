import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className="p-5">
    <h5
      onClick={() => {
        props.setWaitingForDriver(false);

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
            <h2 className='text-lg font-medium capitalize'> {props.ride?.captain.fullname.firstname}
            </h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
            <p className='font-small text-gray-600'>Mercedes Benz</p>
            <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
        </div>
   </div>

    <div className="flex flex-col gap-5 items-center">
     
      <div className="flex flex-col gap-3 w-full">
        {/* Pickup Location */}
        <div className="flex items-center gap-3 p-3 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-center gap-3 p-3 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
          </div>
        </div>

        {/* Fare */}
        <div className="flex items-center gap-3 p-3 border-b-2">
          <i className="text-lg ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash</p>
          </div>
        </div>
      </div>

      
    </div>
  </div>
  )
}

export default WaitingForDriver
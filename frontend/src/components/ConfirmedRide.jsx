import React from 'react';

const ConfirmedRide = (props) => {
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
      <h3 className="text-2xl font-semibold mb-5">Choose your Ride</h3>

      <div className="flex flex-col gap-5 items-center">
        <img
          className="h-20"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt="Vehicle"
        />

        <div className="flex flex-col gap-3 w-full">
          {/* Pickup Location */}
          <div className="flex items-center gap-3 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-3 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-center gap-3 p-3 border-b-2">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">${props.fare[props.vehicleType]}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        <button onClick={()=>{
            props.setVehicleFound(true)
            props.setconfirmRidePanel(false)
            props.createRide()
        }} className="w-full bg-green-600 font-semibold p-2 rounded-lg">
          Confirmed Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
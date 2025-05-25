import React from 'react';

const ConfirmedRide = (props) => {
  return (
    <div className="p-5">

      <h5
        onClick={() => {
          props.setConfirmRidePanel(false);
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

        <button 
          onClick={async () => {
            try {
              // Show loading state
              const button = document.getElementById('confirm-ride-btn');
              if (button) {
                button.textContent = 'Creating ride...';
                button.disabled = true;
              }
              
              // Make sure we have valid fare data
              if (!props.fare || typeof props.fare !== 'object' || !Object.keys(props.fare).length) {
                alert("Unable to create ride: Fare information is missing");
                if (button) {
                  button.textContent = 'Confirm Ride';
                  button.disabled = false;
                }
                return;
              }
              
              // Check if vehicle type is valid and fare exists for that type
              if (!props.vehicleType || !props.fare[props.vehicleType]) {
                alert("Please select a valid vehicle type");
                if (button) {
                  button.textContent = 'Confirm Ride';
                  button.disabled = false;
                }
                return;
              }
              
              // Call the createRide function and wait for result
              const rideData = await props.createRide(props.vehicleType);
              
              // Only proceed if we got valid data back
              if (rideData && rideData._id) {
                props.setVehicleFound(true);
                props.setConfirmRidePanel(false);
              } else {
                throw new Error("Invalid ride data returned");
              }
            } catch (error) {
              console.error("Failed to create ride:", error);
              
              // Don't show an alert here since createRide already shows specific alerts
              
              // Reset button state
              const button = document.getElementById('confirm-ride-btn');
              if (button) {
                button.textContent = 'Confirm Ride';
                button.disabled = false;
              }
            }
          }} 
          id="confirm-ride-btn" 
          className="w-full bg-green-600 font-semibold p-2 rounded-lg text-white"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmedRide;
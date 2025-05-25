import React from 'react'

const VehiclePanel = (props) => {
    // console.log('Props in VehiclePanel:', props); // Debugging props
  return (
    <div>
         <h5 onClick={()=>{
             console.log('Closing Vehicle Panel');
                props.setVehiclePanel(false);
            }} className='p-1 text-center absolute w-[93%] top-0'>
                <i className=' text-3xl text-gray-200 ri-arrow-down-wide-line'/>
            </h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <div onClick={()=>{
                if (!props.fare || !props.fare.car) {
                    alert("Fare information is not available. Please try again later.");
                    return;
                }
                props.setConfirmRidePanel(true)
                props.selectVehicle('car')
            }} className='flex p-3 border-2 active:border-black bg-gray-100 rounded-xl  w-full items-center justify-between mb-2 '>
               <img className='h-10' src='https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png' alt="Car"></img> 
               <div className='ml--2 w-1/2'>
                    <h4 className='font-medium text-base'> UberGo <span><i className='ri-user-3-fill'></i>4</span></h4>
                    <h5  className='font-medium text-sm text-gray-600'>2 mins away</h5>
                    <p className='font-medium text-xs'>Affordable, compact rides</p>
               </div>
               <h2 className='text-lg font-semibold'>${props.fare && props.fare.car ? props.fare.car : "N/A"}</h2>
            </div>
            <div  onClick={()=>{
                if (!props.fare || !props.fare.motorcycle) {
                    alert("Fare information is not available. Please try again later.");
                    return;
                }
                props.setConfirmRidePanel(true)
                props.selectVehicle('motorcycle')
            }} className='flex p-3 border-2 active:border-black bg-gray-100 rounded-xl  w-full items-center justify-between mb-2 '>
               <img className='h-10' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png' alt="Motorcycle"></img> 
               <div className='ml--2 w-1/2'>
                    <h4 className='font-medium text-base'> Moto <span><i className='ri-user-3-fill'></i>1</span></h4>
                    <h5  className='font-medium text-sm text-gray-600'>3 mins away</h5>
                    <p className='font-medium text-xs'>Affordable, motorcycle rides</p>
               </div>
               <h2 className='text-lg font-semibold'>${props.fare && props.fare.motorcycle ? props.fare.motorcycle : "N/A"}</h2>
            </div>
            <div  onClick={()=>{
                if (!props.fare || !props.fare.auto) {
                    alert("Fare information is not available. Please try again later.");
                    return;
                }
                props.setConfirmRidePanel(true)
                props.selectVehicle('auto')
            }} className='flex p-3 border-2 active:border-black bg-gray-100 rounded-xl  w-full items-center justify-between mb-2 '>
               <img className='h-10' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' alt="Auto"></img> 
               <div className='ml--2 w-1/2'>
                    <h4 className='font-medium text-base'> Uber Auto <span><i className='ri-user-3-fill'></i>3</span></h4>
                    <h5  className='font-medium text-sm text-gray-600'>2 mins away</h5>
                    <p className='font-medium text-xs'>Affordable, auto rides</p>
               </div>
               <h2 className='text-lg font-semibold'>${props.fare && props.fare.auto ? props.fare.auto : "N/A"}</h2>
            </div>
        </div> 
    
  )
}

export default VehiclePanel
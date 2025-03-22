import React from 'react'

const LocationSearchPanel = (props) => {

    const locations=['NexEra Colony, Hardoi','NexEra Colony, Hardoi','NexEra Colony, Hardoi','NexEra Colony, Hardoi']    

  return (

    // sample array for location
   
    

    <div>


        {/* this is just a sample data */}

        {
        locations.map(function(elem,idx){
            return(
              
        <div key={idx }onClick={()=>{
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
            }}  className='flex my-2  border-white active:border-black border-2 p-3 rounded-xl gap-4 items-center justify-start'>
        <h2 className='bg-[#eee] h-10 flex items-center justify-center w-10 rounded-full'>
            <i className='ri-map-pin-fill'></i>
        </h2>
        <h4 className='font-medium'>{elem}</h4>
        </div>  
            )
        })
    }



      
        
    </div>
  )
}

export default LocationSearchPanel
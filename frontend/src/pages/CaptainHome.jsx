import React from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useState } from 'react'
import { useRef } from 'react'
import ConfirmRidePopUp from '../components/ConfirmRidePopup'


const CaptainHome = () => {


  const [ridePopupPanel , setRidePopupPanel] = useState(true)
  const [confirmRidePopupPanel , setConfirmRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef=useRef(null)
  useGSAP(function(){
    if(ridePopupPanel){
    gsap.to(ridePopupPanelRef.current,{
        transform:'translateY(0)',   
    })
}else{
    gsap.to(ridePopupPanelRef.current,{
        transform:'translateY(100%)',   
    })
}},
[ridePopupPanel]
)


useGSAP(function(){
  if(confirmRidePopupPanel){
  gsap.to(confirmRidePopupPanelRef.current,{
      transform:'translateY(0)',   
  })
}else{
  gsap.to(confirmRidePopupPanelRef.current,{
      transform:'translateY(100%)',   
  })
}},
[confirmRidePopupPanel]
)

  return (

    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" />
        <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className='text-lg font-bold ri-logout-box-r-line '></i>
        </Link>

      </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABLUH3RR9WY4ogN9jIsbV0QTaQWXDvEWW1A&s'></img>
      </div>
      <div className='h-2/5 p-6'>
        <CaptainDetails/>
      </div>
      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full  bg-white px-3 py-6 pt-12'>
           <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
        </div>

        <div ref={confirmRidePopupPanelRef} className='fixed w-full z-10 bottom-0  h-screen translate-y-full  bg-white px-3 py-6 pt-12'>
           <ConfirmRidePopUp setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}/>
        </div>
    </div>
  )
}

export default CaptainHome
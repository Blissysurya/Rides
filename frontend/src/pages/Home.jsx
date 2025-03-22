import React from 'react'
import {useGSAP}from '@gsap/react'
import { useRef } from 'react'
import { useState } from 'react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {
const [pickup, setPickup] = useState('')
const [destination, setDestination] = useState('')
const [panelOpen, setPanelOpen] = useState(false)
const [vehiclePanel, setVehiclePanel] = useState(false)
const [confirmRidePanel, setconfirmRidePanel] = useState(false)
const [vehicleFound,setVehicleFound]=useState(false)
const [waitingForDriver,setWaitingForDriver]=useState(false)

const panelRef=useRef(null)
const panelCloseRef = useRef(null)
const vehiclePanelRef = useRef(null)
const confirmRidePanelRef = useRef(null)    
const vehicleFoundRef = useRef(null) 
const waitingForDriverRef = useRef(null)   
    const submitHandler=(e)=>{
        e.preventDefault()
        // console.log('Form submitted')

    }


    useGSAP(function(){
        console.log('Panel Ref:', panelRef.current);
        if(panelOpen){
            gsap.to(panelRef.current, {height:'70%',padding:24, duration:0.5})
            gsap.to(panelCloseRef.current, {opacity:1, duration:0.5})
        }else{
            gsap.to(panelCloseRef.current, {opacity:0, duration:0.5})
        
            gsap.to(panelRef.current, {height:0,padding:0, duration:0.5})
        }
    },[panelOpen,panelCloseRef])

    useGSAP(function(){
        if(vehiclePanel){
        gsap.to(vehiclePanelRef.current,{
            transform:'translateY(0)',   
        })
    }else{
        gsap.to(vehiclePanelRef.current,{
            transform:'translateY(100%)',   
        })
    }},
    [vehiclePanel]
    )

    useGSAP(function(){
        if(confirmRidePanel){
        gsap.to(confirmRidePanelRef.current,{
            transform:'translateY(0)',   
        })
    }else{
        gsap.to(confirmRidePanelRef.current,{
            transform:'translateY(100%)',   
        })
    }},
    [confirmRidePanel]
    )

    useGSAP(function(){
        if(vehicleFound){
        gsap.to(vehicleFoundRef.current,{
            transform:'translateY(0)',   
        })
    }else{
        gsap.to(vehicleFoundRef.current,{
            transform:'translateY(100%)',   
        })
    }},
    [confirmRidePanel,vehicleFound]
    )
    
    useGSAP(function(){
        if(waitingForDriver){
        gsap.to(waitingForDriverRef.current,{
            transform:'translateY(0)',   
        })
    }else{
        gsap.to(waitingForDriverRef.current,{
            transform:'translateY(100%)',   
        })
    }},
    [confirmRidePanel,vehicleFound]
    )

  return (
    <div className='h-screen relative overflow-hidden'>
        <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
        <div  className='h-screen w-screen'>
            {/* Temporary image*/}
            <img className='h-full w-full object-cover object-fit' src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt='background' />
        </div>
        <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
            <div className='h-[30%] p-5 bg-white relative'>
               <h5 ref={panelCloseRef} onClick={()=>{setPanelOpen(false)}} className='absolute opacity-0 top-6 right-6 text-2xl'>
                <i className='ri-arrow-down-wide-line'></i>
               </h5>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>
            <form onSubmit={(e)=>{
                submitHandler(e)
            }}>
                <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
                <input
                onClick={()=>{setPanelOpen(true)}}    
                value={pickup}
                onChange={(e)=>{setPickup(e.target.value)}}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 placeholder:text-base' type="text" placeholder='Add a pickup location' />
                <input
                onClick={()=>{setPanelOpen(true)}}
                value={destination}
                onChange={(e)=>{setDestination(e.target.value)}}
                className='bg-[#eee] px-12  py-2 text-lg rounded-lg w-full mt-3 placeholder:text-base' type="text" placeholder='Add a destination' />
            </form>
        </div>
        <div ref={panelRef} className=' bg-white  h-0' >
            <LocationSearchPanel  setPanelOpen={setPanelOpen}  setVehiclePanel={setVehiclePanel}/>
        </div>
        <div ref={vehiclePanelRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-10 translate-y-full pt-12'>
            <VehiclePanel setconfirmRidePanel={setconfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
        </div>
        <div ref={confirmRidePanelRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 translate-y-full pt-12'>
            <ConfirmedRide setconfirmRidePanel={setconfirmRidePanel} setVehicleFound={setVehicleFound}/>
        </div>
        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
            <LookingForDriver setVehicleFound={setVehicleFound}/>
        </div>
        <div  ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
                <WaitingForDriver
                    
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} 
                    
                    />
            </div>
        </div>
    </div>
  )
}

export default Home
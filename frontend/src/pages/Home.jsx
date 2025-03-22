import React from 'react'
import {useGSAP}from '@gsap/react'
import { useRef } from 'react'
import { useState } from 'react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'


const Home = () => {
const [pickup, setPickup] = useState('')
const [destination, setDestination] = useState('')
const [panelOpen, setPanelOpen] = useState(false)

const panelRef=useRef(null)
const panelCloseRef = useRef(null)
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

  return (
    <div className='h-screen relative overflow-hidden'>
        <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'></img>
        <div className='h-screen w-screen'>
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
            <LocationSearchPanel/>
        </div>
        </div>
        <div className='fixed z-10 bottom-0 p-5'>
            <div className='flex items-center justify-between p-5'>
               <img src='https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png'></img> 
               <div>
                <h4>UberGo <span><i className='ri-user-3-fill'></i>4</span></h4>
                <h5>2 mins away</h5>
                <p>Affordable, compact rides</p>
               </div>
               <h2>$10</h2>
            </div>
           
        </div>
    </div>
  )
}

export default Home
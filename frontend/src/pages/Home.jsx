import React, { useRef, useState, useEffect, useContext } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedRide from '../components/ConfirmedRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/userContext'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setconfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [activeField, setActiveField] = useState('') // 'pickup' or 'destination'
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])

  const { sendMessage, receiveMessage, connected } = useContext(SocketContext)
  const {user} = useContext(UserDataContext);

  useEffect(() => {
    if (connected && user && user._id) {
      console.log("Joining socket as user:", user._id);
      sendMessage("join", {userType: "user", userId: user._id });
    }
    
    // Set up event listeners for socket messages
    const unsubscribeRideUpdate = receiveMessage("rideUpdate", (data) => {
      console.log("Received ride update:", data);
      if (data.ride) {
        setRide(data.ride);
      }
    });
    
    // Cleanup function to prevent memory leaks
    return () => {
      unsubscribeRideUpdate();
    };
  }, [connected, user, sendMessage, receiveMessage])


  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  // Fetch suggestions from backend
  // const fetchSuggestions = async (query) => {
  //   if (!query) {
  //     setSuggestions([])
  //     return
  //   }
  //   try {
  //     const res = await axios.get(`http://localhost:4000/location/suggest?q=${encodeURIComponent(query)}`)
  //     setSuggestions(res.data.suggestions || [])
  //   } catch (err) {
  //     setSuggestions([])
  //   }
  // }

  // Handle pickup input change
  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    try{
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params: {input: e.target.value},
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data);
    }catch(err){
      console.error(err);
    }
    
  }

  // Handle destination input change
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try{
      const ressponse = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,{
        params: {input: e.target.value},
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(ressponse.data);
    }catch(err){
      console.error(err);
    }
  }

   

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion)
    } else if (activeField === 'destination') {
      setDestination(suggestion)
    }
    setPanelOpen(false)
  }


      const submitHandler=(e)=>{
        e.preventDefault()
        // console.log('Form submitted')

    }

   useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [ panelOpen ])


    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehiclePanel ])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePanel ])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehicleFound ])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])


    async function findTrip() {
      setVehiclePanel(true);
      setPanelOpen(false)

      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {

        params: {pickup, destination},
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

      })

      setFare(response.data);
    }

    async function createRide(){
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

    }


  // ...existing GSAP and animation logic...

 return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' alt="logo" />
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover object-fit' src="https://cdn.theatlantic.com/thumbor/BlEOtTo9L9mjMLuyCcjG3xYr4qE=/0x48:1231x740/960x540/media/img/mt/2017/04/IMG_7105/original.png" alt='background' />
      </div>
      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => { setPanelOpen(false) }} className='absolute opacity-0 top-6 right-6 text-2xl'>
            <i className='ri-arrow-down-wide-line'></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={e => e.preventDefault()}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-900 rounded-full"></div>
            <input
              onClick={() => { setPanelOpen(true); setActiveField('pickup') }}
              value={pickup}
              onChange={handlePickupChange}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5 placeholder:text-base'
              type="text"
              placeholder='Add a pickup location'
             
            />
            <input
              onClick={() => { setPanelOpen(true); setActiveField('destination')}}
              value={destination}
              onChange={handleDestinationChange}
              className='bg-[#eee] px-12  py-2 text-lg rounded-lg w-full mt-3 placeholder:text-base'
              type="text"
              placeholder='Add a destination'
             
            />
          </form>
          <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
        </div>
        {panelOpen && (
          <div ref={panelRef} className='bg-white'>
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
              onSuggestionClick={handleSuggestionClick}
              setPickup={setPickup}
              setDestination={setDestination}
              activeField={activeField}
            />
          </div>
        )}
        <div ref={vehiclePanelRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-10 translate-y-full pt-12'>
          <VehiclePanel setVehicleType={setVehicleType} fare={fare} setconfirmRidePanel={setconfirmRidePanel} setVehiclePanel={setVehiclePanel} />
        </div>
        <div ref={confirmRidePanelRef} className='fixed w-full z-10 bg-white bottom-0 px-3 py-6 translate-y-full pt-12'>
          <ConfirmedRide createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setconfirmRidePanel={setconfirmRidePanel} setVehicleFound={setVehicleFound} />
        </div>
        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <LookingForDriver createRide={createRide} pickup={pickup} destination={destination} fare={fare} vehicleType={vehicleType} setVehicleFound={setVehicleFound} />
        </div>
        <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
          <WaitingForDriver
          ride={ride}
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
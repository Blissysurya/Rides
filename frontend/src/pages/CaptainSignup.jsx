import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setfirstName] = useState('')
    const [lastname,setlastName]= useState('')
    const [captainData,setCaptainData] = useState({})
    const navigate = useNavigate()
    const {captain, setCaptain} = React.useContext(CaptainDataContext)

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const submitHandler = async (e) => {
      e.preventDefault()
      const captainData={
        fullname:{
          firstname:firstname,
          lastname:lastname
        },
        email:email,
        password:password,
        vehicle:{
          color:vehicleColor,
          plate:vehiclePlate,
          capacity:vehicleCapacity,
          vehicleType:vehicleType
        }
      }
     
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,captainData)

      if(response.status===201){
        const data=response.data;
        setCaptain(data.captain)
        localStorage.setItem('token',data.token)
        navigate('/captain-home')
      }
      setEmail('')
      setfirstName('')
      setlastName('')
      setPassword('')
       console.log(userData)
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
        <form onSubmit={(e) => { submitHandler(e) }}>

          <h3 className='text-base font-medium mb-2'>What's your name?</h3>
          <div className='flex gap-3 mb-5'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder="Firstname"
              value={firstname}
              onChange={(e) => { setfirstName(e.target.value) }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder="Lastname"
              value={lastname}
              onChange={(e) => { setlastName(e.target.value) }}
            />
          </div>

          <h3 className='text-base font-medium mb-2'>What's your email?</h3>
          <input
            required
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
          />
          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <input
            required
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />

          <h3 className='text-base font-medium mb-2'>Vehicle Information</h3>
          <div className='mb-5'>
            <input
              required
              className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => { setVehicleColor(e.target.value) }}
            />
            <input
              required
              className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              type="text"
              placeholder="Vehicle Plate Number"
              value={vehiclePlate}
              onChange={(e) => { setVehiclePlate(e.target.value) }}
            />
            <input
              required
              className='bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => { setVehicleCapacity(e.target.value) }}
            />
            <select
              required
              className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => { setVehicleType(e.target.value) }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          >Create Captain Account</button>
          <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default CaptainSignup
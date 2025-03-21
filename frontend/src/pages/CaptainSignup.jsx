import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const CaptainSignup = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName,setLastName]= useState('')
    const [captainData,setCaptainData] = useState({})
    const submitHandler = (e) => {
      e.preventDefault()
      setCaptainData({
  
        fullName:{
          firstName:firstName,
          lastName:lastName
        },
        email:email,
        password:password
      })
      setEmail('')
      setFirstName('')
      setLastName('')
      setPassword('')
       console.log(userData)
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
        <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
        <form onSubmit={(e)=>{submitHandler(e)}}>
          
        <h3 className='text-base font-medium mb-2'>What's your name?</h3>
          <div className='flex gap-3 mb-5'>
        
        <input
                required
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder="Firstname" 
                value={firstName}
                onChange={(e)=>{setFirstName(e.target.value)}}
                />
          
          <input
                required
                className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                type="text"
                placeholder="Lastname"
                value={lastName}
                onChange={(e)=>{setLastName(e.target.value)}}
                />
          </div>

            <h3 className='text-base font-medium mb-2'>What's your email?</h3>
            <input
                required
                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                />
            <h3 className='text-base font-medium mb-2'>Enter Password</h3>
            <input
                required
                className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
            <button
                className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            >Login</button>
            <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
        </form>
    </div>
    
</div>
  )
}

export default CaptainSignup
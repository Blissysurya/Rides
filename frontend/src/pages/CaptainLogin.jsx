import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {

const [email, setEmail] = React.useState('')
    
    const submitHandler = (e) => {
        e.preventDefault()
        // console.log(email,password)
        setCaptainData({email:email,password:password})
        console.log(captainData)   ;
        
        setEmail('')
        setPassword('')
    }

    const [password, setPassword] = React.useState('')

    const [captainData, setCaptainData] = useState({})


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
        <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
        <form onSubmit={(e)=>{submitHandler(e)}}>
            <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
            <input
                required
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type="email"
                placeholder="Email" />
            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input
                required
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type="password"
                placeholder="Password" />
            <button
                className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            >Login</button>
            <p className='text-center'>Join a fleet ? <Link to='/signup' className='text-blue-600'>Register as a Captain</Link></p>
        </form>
    </div>
    <div>
        <Link
        to='/login'
         className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
    </div>
</div>
  )
}

export default CaptainLogin
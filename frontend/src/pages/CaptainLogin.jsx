import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'   
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const {captain, setCaptain} = React.useContext(CaptainDataContext)
    const [captainData, setCaptainData] = useState({})
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    
    const submitHandler = async(e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)
        
        try {
            // Rename the payload variable to avoid conflict with captain from context
            const loginData = {
                email: email,
                password: password
            }
            
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/captain/login`,
                loginData
            )
            
            if(response.status === 200){
                const data = response.data;
                setCaptain(data.captain)
                localStorage.setItem('token', data.token)
                navigate('/captain-home')
            }
            
            setEmail('')
            setPassword('')
        } catch (err) {
            console.error('Login error:', err);
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                if (err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                } else if (err.response.data && err.response.data.errors) {
                    setError(err.response.data.errors[0].msg);
                } else {
                    setError('Login failed. Please check your credentials.');
                }
                console.log(err.response.data);
            } else if (err.request) {
                // The request was made but no response was received
                setError('No response from server. Please try again later.');
            } else {
                // Something happened in setting up the request
                setError('An error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png' />
            <form onSubmit={(e)=>{submitHandler(e)}}>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
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
                    disabled={isLoading}
                    className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <p className='text-center'>Join a fleet ? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
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
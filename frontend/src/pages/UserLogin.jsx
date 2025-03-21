import React from 'react'
import {Link} from 'react-router-dom'
import { useState,useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import {UserDataContext} from '../context/userContext'
import axios from 'axios'

const UserLogin = () => {
    const [email, setEmail] = React.useState('')
    
    const navigate=useNavigate()
    const [password, setPassword] = React.useState('')
    const [userData, setUserData] = useState({})
    const {user, setUser} = useContext(UserDataContext)

    const submitHandler = async(e) => {
        e.preventDefault()
 
        // console.log(email,password)
        const userData={
            email: email,
            password: password
        }
        // console.log(userData)   ;

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData)
        if(response.status===201){
            const data=response.data;
            setUser(data.user)
            localStorage.setItem('token',data.token)
            navigate('/home')
        }

        setEmail('')
        setPassword('')
    }

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
                    <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
                </form>
            </div>
            <div>
                <Link
                to='/captain-login'
                 className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                >Sign in as Captain</Link>
            </div>
        </div>
    )
}

export default UserLogin
import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const CaptainProtectedWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {captain, setCaptain} = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)
    
    useEffect(() => {
        if(!token){
            navigate('/captain-login')
            return;
        }
        
        // Move the API call inside useEffect to prevent excessive calls
        const fetchCaptainProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                
                if(response.status === 200){
                    setCaptain(response.data.captain)
                    setIsLoading(false)
                }
            } catch (error) {
                console.log(error)
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        };
        
        fetchCaptainProfile();
        
    }, [token, navigate, setCaptain]); // Add all dependencies
    
    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </> 
    )
}

export default CaptainProtectedWrapper

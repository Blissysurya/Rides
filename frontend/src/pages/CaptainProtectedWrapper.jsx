import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'

const CaptainProtectedWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {captain, setCaptain, isLoading, setIsLoading, setError} = useContext(CaptainDataContext)
    
    useEffect(() => {
        if(!token){
            navigate('/captain-login')
            return;
        }
        
        // Skip the API call if captain data is already loaded
        if (captain && captain._id) {
            console.log("Captain data already in context:", captain._id);
            setIsLoading(false);
            return;
        }
        
        const fetchCaptainProfile = async () => {
            try {
                setIsLoading(true);
                setError && setError(null);
                console.log("Fetching captain profile data...");
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                
                if(response.status === 200){
                    console.log("Captain profile data fetched successfully");
                    setCaptain(response.data.captain);
                    setError && setError(null);
                } else {
                    setError && setError("Unable to fetch captain details");
                }
            } catch (error) {
                setError && setError("Unable to fetch captain details");
                console.error("Failed to fetch captain profile:", error);
                localStorage.removeItem('token');
                navigate('/captain-login');
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchCaptainProfile();
    }, [token, navigate, setCaptain, captain, setIsLoading, setError]); 
    
    if(isLoading){
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-4">Loading captain profile...</div>
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
                </div>
            </div>
        );
    }

    return children;
}

export default CaptainProtectedWrapper

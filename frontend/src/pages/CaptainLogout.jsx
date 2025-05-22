import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogout = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)

    useEffect(() => {
        const performLogout = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captain/logout`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                
                if (response.status === 200) {
                    localStorage.removeItem('token')
                    setCaptain(null)
                    navigate('/captain-login')
                }
            } catch (error) {
                console.error("Logout failed:", error)
                localStorage.removeItem('token')
                setCaptain(null)
                navigate('/captain-login')
            }
        }
        
        performLogout()
    }, [token, navigate, setCaptain])
    
    return <></>
}

export default CaptainLogout

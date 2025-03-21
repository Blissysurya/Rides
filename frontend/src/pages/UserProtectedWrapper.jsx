import React, { use, useContext } from 'react'
import { UserDataContext } from '../context/userContext'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

const UserProtectedWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if(!token){
            navigate('/login')
        }
    }, [token])
   

  return (
    <>
        {children}
    </> 
  )
}

export default UserProtectedWrapper

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

// Create context
export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`)


const SocketProvider = ({ children }) => {

  useEffect(()=>{

    socket.on('connect',()=> {
      console.log('Socket connected:', socket.id);
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected'); 
    })
  },[]);

  return(
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  )
}   

export default SocketProvider;

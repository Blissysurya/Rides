import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create context
export const SocketContext = createContext();

// Custom hook for using the socket context
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    // Connect to the server
    const socketInstance = io(`${import.meta.env.VITE_BASE_URL}`, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Set up event listeners
    socketInstance.on('connect', () => {
      console.log('Connected to socket server');
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setConnected(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setConnected(false);
    });

    // Save socket instance
    setSocket(socketInstance);

    // Clean up
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  // Function to send a message to a specific event
  const sendMessage = (eventName, message) => {
    if (socket && connected) {
      socket.emit(eventName, message);
      return true;
    }
    console.error('Socket not connected, cannot send message');
    return false;
  };

  // Function to set up a listener for receiving messages
  const receiveMessage = (eventName, callback) => {
    if (socket) {
      socket.on(eventName, callback);
      return () => socket.off(eventName, callback);
    }
    console.error('Socket not initialized, cannot receive messages');
    return () => {};
  };

  // Join a room as user or captain
  const joinAsUser = (userId, userType) => {
    if (socket && connected) {
      socket.emit('join', { userId, userType });
    }
  };

  return (
    <SocketContext.Provider value={{ connected, sendMessage, receiveMessage, joinAsUser }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

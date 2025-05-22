import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';

// Create context
export const SocketContext = createContext();

// Custom hook for using the socket context
export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  // Initialize socket connection
  useEffect(() => {
    let socketInstance = null;

    const connectSocket = () => {
      // Connect to the server with exponential backoff
      socketInstance = io(import.meta.env.VITE_BASE_URL || 'http://localhost:3000', {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 1000 * Math.min(connectionAttempts + 1, 10), // Exponential backoff
        timeout: 20000,
      });

      // Set up event listeners
      socketInstance.on('connect', () => {
        console.log('Connected to socket server with ID:', socketInstance.id);
        setConnected(true);
        setConnectionAttempts(0);
      });

      socketInstance.on('disconnect', (reason) => {
        console.log('Disconnected from socket server. Reason:', reason);
        setConnected(false);
      });

      socketInstance.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message);
        setConnected(false);
        setConnectionAttempts((prev) => prev + 1);
      });

      // Save socket instance
      setSocket(socketInstance);
    };

    connectSocket();

    // Clean up
    return () => {
      if (socketInstance) {
        console.log('Cleaning up socket connection');
        socketInstance.disconnect();
        socketInstance = null;
      }
    };
  }, [connectionAttempts]);

  // Function to send a message to a specific event
  const sendMessage = useCallback(
    (eventName, message) => {
      if (socket && connected) {
        try {
          console.log(`Sending message to ${eventName}:`, message);
          socket.emit(eventName, message);
          return true;
        } catch (error) {
          console.error(`Error sending message to ${eventName}:`, error);
          return false;
        }
      }
      console.warn('Socket not connected, cannot send message to', eventName);
      return false;
    },
    [socket, connected]
  );

  // Function to set up a listener for receiving messages
  const receiveMessage = useCallback(
    (eventName, callback) => {
      if (socket) {
        socket.on(eventName, callback);
        return () => socket.off(eventName, callback);
      }
      console.warn('Socket not initialized, cannot receive messages from', eventName);
      return () => {};
    },
    [socket]
  );

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;

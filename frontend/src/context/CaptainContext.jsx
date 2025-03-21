import React, { createContext, useState, useContext } from 'react';

// Create the Captain Context
export const CaptainDataContext = createContext();

// Create a provider component
export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [error, setError] = useState(null);

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    }

    const value={
        captain,
        setCaptain,
        updateCaptain,
        isLoading,
        setIsLoading,
        error,
        setError
    }
    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

// Custom hook to use the Captain Context
// export const useCaptain = () => {
//     const context = useContext(CaptainContext);
//     if (!context) {
//         throw new Error('useCaptain must be used within a CaptainProvider');
//     }
//     return context;
// };

export default CaptainContext;
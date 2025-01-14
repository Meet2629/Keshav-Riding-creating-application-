import { createContext, useState } from 'react';

// Create a new context
export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    // State variables
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Function to update captain data
    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    // Context value to be provided to children
    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain,
    };

    // Return the context provider with value
    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;

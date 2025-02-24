import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserDataContext = createContext();

const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/user/profile`,
                    {
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.data && response.data._id) {
                    setUser(response.data);
                } else {
                    throw new Error('Invalid user data received');
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                setError(error.response?.data?.message || 'Failed to fetch user data');
                if (error.response?.status === 401) {
                    localStorage.removeItem('token');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <UserDataContext.Provider value={{ 
            user, 
            setUser, 
            loading, 
            error,
            logout 
        }}>
            {children}
        </UserDataContext.Provider>
    );
};

export default UserContext; 
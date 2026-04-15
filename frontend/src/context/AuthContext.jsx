import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
    const [user, setUser] = useState(() => {
        try {
            const userInfo = localStorage.getItem('userInfo');
            return userInfo ? JSON.parse(userInfo) : null;
        } catch (error) {
            console.error("Corrupted local storage data found. Clearing...", error);
            localStorage.removeItem('userInfo');
            return null;
        }
    });

   
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);

    const login = (userData) => {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null); 
    };

   
    const value = { 
        user, 
        login, 
        logout, 
        loading,
        isAuthenticated: !!user 
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
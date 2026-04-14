import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 1. Lazy Initialization: React runs this once on load.
    // This fixes the ESLint warning, stops double-renders, and safely parses the JSON!
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

    // 2. Because we read local storage instantly above, we don't need to 
    // wait for a useEffect. Loading can just start as false.
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

    // 3. Package everything up, including the isAuthenticated boolean for your PrivateRoute
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
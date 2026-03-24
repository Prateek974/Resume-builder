import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // ⚠️ TEMPORARY COLLABORATOR BYPASS: Hardcoded fake user
    const [user, setUser] = useState({
        name: "Test User",
        email: "test@skit.edu",
        token: "fake-bypass-token"
    });
    
    // Set to false immediately so the app doesn't hang on a loading screen
    const [loading] = useState(false); 

    // ⚠️ TEMPORARILY DISABLED: Restore this block when you want real logins again!
    /*
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
        setLoading(false);
    }, []);
    */

    const login = (userData) => {
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null); // When testing, clicking logout will still clear the fake user for that session
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = () => {
    // Grab the explicit boolean we created in the Context
    const { isAuthenticated, loading } = useAuth();

    // 1. Crucial: While reading from localStorage, show a loading spinner.
    // This stops the app from accidentally kicking a logged-in user to /login
    // during a page refresh.
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009245]"></div>
            </div>
        );
    }

    // 2. If authenticated, show the protected page (the nested Route)
    // 3. If not, redirect to login and "replace" the history entry
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
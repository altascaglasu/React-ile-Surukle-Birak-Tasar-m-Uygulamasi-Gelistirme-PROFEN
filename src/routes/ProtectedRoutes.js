import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = ({ children }) => {
    const loggedIn = useSelector((state) => state.user.loggedIn);
    if (!loggedIn) {
        // Eğer giriş yapılmamışsa login sayfasına yönlendir
        return <Navigate to="/login" replace />;
    }

    return children; // Giriş yapılmışsa, child bileşeni render et
};

export default ProtectedRoutes;

// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, userRole, requiredRole }) => {
    // Check if the user role matches the required role
    return userRole === requiredRole ? element : <Navigate to="/" />; // Redirect if unauthorized
};

export default ProtectedRoute;

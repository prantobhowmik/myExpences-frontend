import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}


// Checks for both JWT and session cookie
const isAuthenticated = () => {
  const jwt = sessionStorage.getItem('jwt');
  // Optionally, check for session cookie (set by backend)
  const hasSessionCookie = document.cookie.split(';').some(c => c.trim().startsWith('session='));
  return Boolean(jwt) || hasSessionCookie;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

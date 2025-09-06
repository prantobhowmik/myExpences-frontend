import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}



// Checks for JWT in localStorage/sessionStorage and validates expiration
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch {
    return null;
  }
}

const isAuthenticated = () => {
  const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
  if (!jwt) return false;
  const payload = parseJwt(jwt);
  if (!payload || !payload.exp) return false;
  // exp is in seconds since epoch
  const now = Math.floor(Date.now() / 1000);
  return payload.exp > now;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;

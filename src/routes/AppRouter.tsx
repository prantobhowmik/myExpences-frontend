
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import Home from '../components/Home';
import ProtectedRoute from '../components/ProtectedRoute';


// Auth check for redirect
const isAuthenticated = () => {
	const jwt = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
	const hasSessionCookie = document.cookie.split(';').some(c => c.trim().startsWith('session='));
	return Boolean(jwt) || hasSessionCookie;
};

const AuthRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const location = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated() && (location.pathname === '/' || location.pathname === '/login')) {
			navigate('/home', { replace: true });
		}
	}, [location]);
	return <>{children}</>;
};

const AppRouter = () => (
	<Router>
		<AuthRedirect>
			<Routes>
				<Route path="/" element={<LoginForm />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/signup" element={<SignupForm />} />
				<Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
			</Routes>
		</AuthRedirect>
	</Router>
);

export default AppRouter;

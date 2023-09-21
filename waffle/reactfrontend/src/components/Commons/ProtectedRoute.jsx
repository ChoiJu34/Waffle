import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export function ProtectedRoute({ children }) {
    const isLoggedIn = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            console.log('Not logged in. Redirecting...');
            navigate('/user/login', { state: { from: 'fromComplete'}});
        }
    }, [isLoggedIn, navigate]);

    return children;
}